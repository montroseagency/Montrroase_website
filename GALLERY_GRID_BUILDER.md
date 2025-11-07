# Gallery Grid Builder - Complete Guide

## Overview

The Gallery Grid Builder is a **visual grid-based interface** where you can:
1. See 10 grid cells (5 columns × 2 rows) representing your gallery layout
2. Click on any **+** card to add an image
3. Fill in image details (title, caption, alt text)
4. Upload the image file
5. See a real-time preview of how it will look on the homepage
6. Click "Save Layout" to finalize everything

## How It Works

### Grid Layout
```
ADMIN GRID BUILDER (5 cols × 2 rows = 10 cells)
┌─────┬─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │  5  │  (Row 1)
├─────┼─────┼─────┼─────┼─────┤
│  6  │  7  │  8  │  9  │  10 │  (Row 2)
└─────┴─────┴─────┴─────┴─────┘
          ↓
HOMEPAGE DISPLAY (2-row layout, 800px height)
┌──────────────────────────────────────┐
│ Image1 │ Image2 │ Image3 │ Image4 │ Image5 │ (400px)
├──────────────────────────────────────┤
│ Image6 │ Image7 │ Image8 │ Image9 │ Image10│ (400px)
└──────────────────────────────────────┘
```

### Data Flow
```
Admin Grid Builder
  ↓ (Click + cell)
Upload Modal
  ↓ (Select image, fill metadata)
API POST/PATCH
  ↓ (Image saved to database)
Grid Cell Updates
  ↓ (Cell shows image thumbnail)
Click "Save Layout"
  ↓ (Update display_order for all images)
Homepage Fetches from API
  ↓
Images Display in 2-Row Layout
```

## Step-by-Step Usage

### 1. Access the Grid Builder
```
URL: http://localhost:3000/dashboard/admin/gallery
```

You'll see:
- **Header**: "Gallery Grid Builder"
- **10 Grid Cells**: 5 columns × 2 rows (with + symbols)
- **Save Layout Button**: Green button at bottom
- **Homepage Preview**: Shows how it will look on site

### 2. Add Your First Image

**Click on any + cell:**
```
┌────────────┐
│     +      │
│ Add Image  │
└────────────┘
```

**Modal opens with:**
- File upload input
- Title field
- Caption field (optional)
- Alt text field

**Fill in the form:**
```
Title: "Beautiful Sunset"
Caption: "Captured at golden hour"
Alt Text: "Sunset over mountains"
```

**Select image file:**
- Click "Image File" input
- Choose JPG or PNG from your computer
- Preview appears in modal

**Click "Add to Grid":**
- Image uploads to server
- Cell updates with thumbnail
- Modal closes
- Grid shows your image

### 3. Add More Images

Repeat step 2 for each of the 10 cells. You can:
- Leave cells empty (they won't show on homepage)
- Fill all 10 cells (full gallery)
- Fill any combination

**Hover over a filled cell to:**
- See image title
- Click "Remove" to delete from grid

### 4. See Live Preview

**Below the grid:**
```
Homepage Preview (2-Row Layout)
[Row 1: Images 1-5 side by side]
[Row 2: Images 6-10 side by side]
```

The preview updates in real-time as you add/remove images.

### 5. Save the Layout

**Click "Save Layout" button:**
- Updates `display_order` for all images
- Sends to backend API
- Images are now set in their grid positions
- Success message appears

### 6. View on Homepage

**Navigate to homepage:**
```
URL: http://localhost:3000
```

**Scroll to gallery section:**
- See your 2-row layout
- Images display exactly as in preview
- Hover effects work (glow, title overlay)
- Each image shows title and caption on hover

## Features

### Grid Builder
- ✅ Visual 5×2 grid layout
- ✅ Click to add images
- ✅ Real-time preview
- ✅ Image thumbnails in grid
- ✅ Remove button on hover
- ✅ Position indicators (1-10)

### Upload Modal
- ✅ File upload with preview
- ✅ Title input (required)
- ✅ Caption input (optional)
- ✅ Alt text input (optional)
- ✅ Add/Update buttons
- ✅ Cancel button

### Homepage Display
- ✅ 2-row layout (800px height)
- ✅ Images fill rows 1-5 and 6-10
- ✅ Responsive flex sizing
- ✅ Cursor-following glow effect
- ✅ Hover animations
- ✅ Title and caption overlay
- ✅ Object-cover image fitting

## API Integration

### Behind the Scenes

When you click "Add to Grid":
```
POST /api/gallery/
{
  "image": <file>,
  "title": "Image Title",
  "caption": "Optional caption",
  "alt_text": "Description",
  "display_order": 0,  // Position in grid
  "flex_width": "1fr",
  "grid_column": 1,
  "grid_row": 1
}
```

When you click "Save Layout":
```
PATCH /api/gallery/{id}/
{
  "display_order": <position>  // 0-9
}
```

When homepage loads:
```
GET /api/gallery/
Returns all images sorted by display_order
```

## Tips & Tricks

### Organizing Images
1. Plan your layout before uploading
2. Add images in order (left to right, top to bottom)
3. Use the preview to check layout

### Image Best Practices
- Use high-quality images (at least 400×400px)
- Consistent aspect ratios look better
- JPG for photos, PNG for graphics
- Keep file sizes under 2MB for fast loading

### Editing Images
- Click on a filled cell to edit metadata
- Add new image or skip re-upload
- Click "Update" to save changes

### Removing Images
- Hover over filled cell
- Click "Remove" button
- Confirm deletion
- Cell becomes empty + again

### Refreshing
- Click "Refresh" button to reload from server
- Useful if multiple people are editing
- Resets grid to current database state

## Troubleshooting

### Issue: Can't see the grid builder page
**Solution:**
1. Verify you're logged in as admin
2. Check URL: `http://localhost:3000/dashboard/admin/gallery`
3. Make sure both servers are running

### Issue: Upload button doesn't work
**Solution:**
1. Select an image file first
2. Fill in title field (required)
3. Check browser console for errors
4. Verify backend is running

### Issue: Images don't appear after saving
**Solution:**
1. Click "Refresh" button
2. Check homepage to see if images appear
3. Open browser developer tools (F12)
4. Check Network tab for API errors

### Issue: Preview doesn't match homepage display
**Solution:**
1. Refresh page (Ctrl+R)
2. Check that "Save Layout" was successful
3. Try a different browser
4. Check image URLs are loading

### Issue: Old images still showing on homepage
**Solution:**
1. Hard refresh homepage (Ctrl+Shift+R)
2. Clear browser cache (Settings → Clear browsing data)
3. Verify database was updated

## Database Details

The grid uses a `display_order` field (0-9) to determine position:
```
Position 0-4  → Row 1 (images 1-5)
Position 5-9  → Row 2 (images 6-10)
```

Each cell stores:
- `id` - Unique identifier
- `image_url` - Full URL to image
- `title` - Image title
- `caption` - Optional description
- `alt_text` - Accessibility text
- `display_order` - Position in grid (0-9)
- `is_active` - Visibility flag (true)
- `image` - File path on server

## Architecture

```
Frontend (React)
│
├─ Grid Builder Component
│  └─ 10 Grid Cells (click to upload)
│
├─ Upload Modal
│  └─ Form for image metadata
│
├─ Homepage Carousel
│  └─ 2-Row Layout Display
│
└─ API Client
   └─ Fetch/POST/PATCH/DELETE requests

Backend (Django)
│
├─ ImageGalleryViewSet
│  └─ CRUD operations
│
├─ ImageGalleryItem Model
│  └─ Database storage
│
└─ /api/gallery/ Endpoints
   ├─ GET - List all images
   ├─ POST - Create new image
   ├─ PATCH - Update image
   └─ DELETE - Remove image
```

## Workflow Summary

1. **Open Grid Builder** → See 10 empty cells with +
2. **Click Cell** → Upload Modal opens
3. **Upload Image** → Select file from computer
4. **Fill Metadata** → Title, caption, alt text
5. **Click Add** → Image uploads to server
6. **Cell Updates** → Shows image thumbnail
7. **Repeat** → Add more images to other cells
8. **Check Preview** → See 2-row layout below
9. **Save Layout** → Click green button
10. **View Homepage** → Images display in grid

## File Locations

- **Grid Builder Page**: `client/app/dashboard/admin/gallery/page.tsx`
- **Homepage Carousel**: `client/components/image-carousel.tsx`
- **Backend ViewSet**: `server/api/views/gallery_views.py`
- **Database Model**: `server/api/models.py`

## Next Steps

After setting up your gallery:

1. **Customize styling** in `image-carousel.tsx`
   - Adjust hover effects
   - Change glow color
   - Modify animation timing

2. **Add more cells** if needed
   - Update grid size in builder
   - Modify homepage display

3. **Optimize images**
   - Crop to consistent sizes
   - Compress for web
   - Use image CDN

## Support

For issues:
1. Check browser console (F12)
2. Check Django server logs
3. Run API test: `python test_gallery_api.py`
4. Review this guide's troubleshooting section

---

**Ready to build your gallery? Start at:** `http://localhost:3000/dashboard/admin/gallery`
