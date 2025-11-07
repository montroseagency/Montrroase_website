'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface GridCell {
  id: string;
  position: number;
  image_url: string | null;
  title: string;
  caption: string;
  alt_text: string;
  isEmpty: boolean;
}

export default function GalleryBuilder() {
  const [gridCells, setGridCells] = useState<GridCell[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedCell, setSelectedCell] = useState<GridCell | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [cellMetadata, setCellMetadata] = useState({
    title: '',
    caption: '',
    alt_text: '',
  });

  // Initialize grid with 10 cells (for visual building)
  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = async () => {
    try {
      // Fetch existing layout from API
      const response = await fetch('http://localhost:8000/api/gallery/');
      const data = await response.json();
      const items = Array.isArray(data) ? data : data.results || [];

      if (items.length > 0) {
        // Convert existing items to grid cells
        const cells = items.map((item: any, idx: number) => ({
          id: item.id,
          position: idx,
          image_url: item.image_url,
          title: item.title,
          caption: item.caption,
          alt_text: item.alt_text,
          isEmpty: !item.image_url,
        }));

        // Pad with empty cells up to 10
        while (cells.length < 10) {
          cells.push({
            id: `empty-${Math.random()}`,
            position: cells.length,
            image_url: null,
            title: '',
            caption: '',
            alt_text: '',
            isEmpty: true,
          });
        }

        setGridCells(cells);
      } else {
        // Create empty grid with 10 cells
        const newCells: GridCell[] = Array.from({ length: 10 }, (_, i) => ({
          id: `empty-${i}`,
          position: i,
          image_url: null,
          title: '',
          caption: '',
          alt_text: '',
          isEmpty: true,
        }));
        setGridCells(newCells);
      }
    } catch (error) {
      console.error('Error loading gallery:', error);
      // Create empty grid on error
      const newCells: GridCell[] = Array.from({ length: 10 }, (_, i) => ({
        id: `empty-${i}`,
        position: i,
        image_url: null,
        title: '',
        caption: '',
        alt_text: '',
        isEmpty: true,
      }));
      setGridCells(newCells);
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = (cell: GridCell) => {
    setSelectedCell(cell);
    // For new cells, start with empty form to let user enter title
    // For existing cells, pre-fill with current data
    setCellMetadata({
      title: cell.isEmpty ? '' : cell.title,
      caption: cell.isEmpty ? '' : cell.caption,
      alt_text: cell.isEmpty ? '' : cell.alt_text,
    });
    setUploadFile(null);
    setShowUploadModal(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUploadCell = async () => {
    if (!selectedCell || !uploadFile) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', uploadFile);
    formData.append('title', cellMetadata.title || 'Untitled');
    formData.append('alt_text', cellMetadata.alt_text);
    formData.append('caption', cellMetadata.caption);
    formData.append('display_order', selectedCell.position.toString());
    formData.append('flex_width', '1fr');
    formData.append('grid_column', '1');
    formData.append('grid_row', '1');

    try {
      const url = selectedCell.id.startsWith('empty')
        ? 'http://localhost:8000/api/gallery/'
        : `http://localhost:8000/api/gallery/${selectedCell.id}/`;

      const method = selectedCell.id.startsWith('empty') ? 'POST' : 'PATCH';

      const token = localStorage.getItem('auth_token');
      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload response:', result);
        const newCells = gridCells.map((cell) => {
          if (cell.position === selectedCell.position) {
            return {
              ...cell,
              id: result.id,
              image_url: result.image_url,
              title: result.title || cellMetadata.title,
              caption: result.caption || cellMetadata.caption,
              alt_text: result.alt_text || cellMetadata.alt_text,
              isEmpty: false,
            };
          }
          return cell;
        });
        setGridCells(newCells);
        setShowUploadModal(false);
        setUploadFile(null);
        setCellMetadata({ title: '', caption: '', alt_text: '' });
        alert('Image uploaded successfully!');
      } else {
        const errorText = await response.text();
        console.error('Upload failed:', response.status, errorText);
        alert('Failed to upload image: ' + response.status);
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Error uploading image');
    }
  };

  const handleRemoveCell = async (cell: GridCell) => {
    if (cell.isEmpty) return;

    if (!confirm('Remove this image?')) return;

    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`http://localhost:8000/api/gallery/${cell.id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        const newCells = gridCells.map((c) => {
          if (c.position === cell.position) {
            return {
              ...c,
              id: `empty-${Math.random()}`,
              image_url: null,
              title: '',
              caption: '',
              alt_text: '',
              isEmpty: true,
            };
          }
          return c;
        });
        setGridCells(newCells);
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleSaveLayout = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('auth_token');

      // Only update items that:
      // 1. Are not empty
      // 2. Don't have an "empty-" ID (meaning they were actually saved to DB)
      const updatePromises = gridCells
        .filter((cell) => !cell.isEmpty && !cell.id.startsWith('empty-'))
        .map((cell) => {
          console.log(`Saving position ${cell.position} for item ${cell.id}`);
          return fetch(`http://localhost:8000/api/gallery/${cell.id}/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({ display_order: cell.position }),
          }).then((response) => {
            if (!response.ok) {
              console.error(`Failed to save ${cell.id}:`, response.status);
            }
            return response;
          });
        });

      const results = await Promise.all(updatePromises);
      const failedCount = results.filter((r) => !r.ok).length;

      if (failedCount > 0) {
        alert(`Layout partially saved. ${failedCount} items failed to update.`);
      } else {
        alert('Layout saved successfully!');
      }
    } catch (error) {
      console.error('Error saving layout:', error);
      alert('Failed to save layout');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading gallery builder...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Gallery Grid Builder</h1>
            <Link href="/dashboard/admin" className="text-blue-600 hover:text-blue-700">
              ← Back to Dashboard
            </Link>
          </div>
          <p className="text-gray-600">
            Click on any + card to add an image. Arrange your gallery layout. Click "Save Layout" when done.
          </p>
        </div>

        {/* Grid Builder */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Grid Layout Editor</h2>

            {/* Gallery Grid - 5 columns x 2 rows */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {gridCells.map((cell, idx) => (
                idx < 10 && (
                  <div
                    key={cell.id}
                    className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition group"
                    onClick={() => handleCellClick(cell)}
                  >
                    {cell.isEmpty ? (
                      // Empty cell with + button
                      <div className="flex items-center justify-center w-full h-full bg-gray-200 hover:bg-gray-300 transition">
                        <div className="text-center">
                          <div className="text-4xl font-light text-gray-400 mb-2">+</div>
                          <p className="text-xs text-gray-500">Add Image</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Image in cell */}
                        <img
                          src={cell.image_url || ''}
                          alt={cell.alt_text || cell.title}
                          className="w-full h-full object-cover"
                        />

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center">
                          <p className="text-white text-sm font-semibold text-center px-2 mb-3">
                            {cell.title}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveCell(cell);
                            }}
                            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>

                        {/* Position indicator */}
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {cell.position + 1}
                        </div>
                      </>
                    )}
                  </div>
                )
              ))}
            </div>

            {/* Save Button */}
            <div className="flex gap-4">
              <button
                onClick={handleSaveLayout}
                disabled={saving}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition font-semibold"
              >
                {saving ? 'Saving...' : 'Save Layout'}
              </button>
              <button
                onClick={initializeGrid}
                className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-semibold"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Homepage Preview (2-Row Layout)</h2>
          <div className="bg-black rounded-lg overflow-hidden" style={{ maxHeight: '400px' }}>
            {/* Simulate 2-row layout */}
            <div className="flex h-48">
              {gridCells.slice(0, 5).filter(c => !c.isEmpty).map((cell) => (
                <div
                  key={cell.id}
                  className="flex-1 overflow-hidden"
                >
                  <img
                    src={cell.image_url || ''}
                    alt={cell.alt_text || cell.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex h-48">
              {gridCells.slice(5, 10).filter(c => !c.isEmpty).map((cell) => (
                <div
                  key={cell.id}
                  className="flex-1 overflow-hidden"
                >
                  <img
                    src={cell.image_url || ''}
                    alt={cell.alt_text || cell.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Images 1-5 appear in first row, images 6-10 appear in second row on homepage
          </p>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedCell?.isEmpty ? 'Add Image' : 'Edit Image'}
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Image Preview */}
              {uploadFile && (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(uploadFile)}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded"
                  />
                </div>
              )}

              {/* File Input */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Image File
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required={selectedCell?.isEmpty}
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={cellMetadata.title}
                  onChange={(e) =>
                    setCellMetadata({ ...cellMetadata, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Image title"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Caption
                </label>
                <textarea
                  value={cellMetadata.caption}
                  onChange={(e) =>
                    setCellMetadata({ ...cellMetadata, caption: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Optional caption"
                />
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={cellMetadata.alt_text}
                  onChange={(e) =>
                    setCellMetadata({ ...cellMetadata, alt_text: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description for accessibility"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUploadCell}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  {selectedCell?.isEmpty ? 'Add to Grid' : 'Update'}
                </button>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
