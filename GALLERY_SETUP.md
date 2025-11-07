# Image Gallery Feature - Setup & Testing Guide

## Overview
The image gallery is a fully functional admin-controlled image management system with a beautiful two-row layout on the homepage and a comprehensive admin dashboard for managing images.

## Features

### Frontend
- **Homepage Carousel** (`/` route)
  - Dynamic two-row image grid layout (800px total height)
  - Cursor-following glow effect
  - Hover effects with image info (title, caption)
  - Responsive flex layout based on admin-configured sizes
  - Auto-fetches from backend API

- **Admin Dashboard** (`/dashboard/admin/gallery`)
  - Full CRUD operations (Create, Read, Update, Delete)
  - Image upload with file input
  - Grid layout configuration (columns, rows)
  - Flex width sizing (0.5fr to 2.5fr)
  - Alt text and caption metadata
  - Real-time preview of layout
  - Reorder functionality
  - Toggle active/inactive status

### Backend
- **Django REST API** (`/api/gallery/`)
  - ImageGalleryItem model with UUID primary key
  - Paginated list endpoint (20 items per page)
  - CRUD operations (admin only for create/update/delete)
  - Public read access for gallery display
  - Image URL generation with absolute paths
  - Ordering by display_order field

## Setup Instructions

### 1. Database Migration (Already Done)
The database migration has been applied. The `ImageGalleryItem` table now exists with all necessary fields:

```bash
python manage.py migrate
# Output: Applying api.0002_imagegalleryitem... OK
```

### 2. Verify Backend Setup

**Check Gallery Views:**
```bash
cd server
python manage.py shell -c "from api.views.gallery_views import ImageGalleryViewSet; print('Gallery views imported successfully')"
```

**Check Model:**
```bash
python manage.py shell -c "from api.models import ImageGalleryItem; print('Items in DB:', ImageGalleryItem.objects.count())"
```

**Verify API Endpoint:**
```bash
# Start Django server
python manage.py runserver

# In another terminal, test the endpoint
curl http://localhost:8000/api/gallery/
```

### 3. Start Development Servers

**Backend Server (Terminal 1):**
```bash
cd server
python manage.py runserver
# Should output: Starting development server at http://127.0.0.1:8000/
```

**Frontend Server (Terminal 2):**
```bash
cd client
npm run dev
# Should output: ▲ Next.js 15.x.x started server on 0.0.0.0:3000
```

## Testing Guide

### Test 1: View Public Gallery
1. Navigate to `http://localhost:3000/` (homepage)
2. You should see the image carousel section loading
3. If no images exist yet, you'll see an empty two-row layout
4. Add sample images first (see Test 2)

### Test 2: Admin Gallery Management

**Access Admin Page:**
1. Navigate to `http://localhost:3000/dashboard/admin/gallery`
2. You should see "Image Gallery Management" heading
3. Current items count will be displayed

**Add New Image:**
1. Click "+ Add New Image" button
2. Fill in form:
   - **Title**: e.g., "Beautiful Landscape"
   - **Image**: Upload an image file (JPG, PNG)
   - **Grid Columns**: 1-4 (usually 1)
   - **Grid Rows**: 1-4 (usually 1)
   - **Flex Width**: Select from dropdown (default: 1fr)
   - **Alt Text**: Describe the image
   - **Caption**: Optional description shown on hover
3. Click "Create" button
4. Image should appear in items list and preview

**Edit Image:**
1. Click "Edit" on any item
2. Modify fields (you can't change image file in edit mode, only metadata)
3. Click "Update" to save changes

**Delete Image:**
1. Click "Delete" on any item
2. Confirm deletion in popup
3. Item removed from list and preview

**Reorder Images:**
- Images are displayed in order of display_order field
- Current order is determined by creation order
- Reordering via drag-and-drop would require additional frontend enhancement

### Test 3: Image Display on Homepage

After adding images via admin:
1. Refresh homepage (`http://localhost:3000/`)
2. Images should load in two-row layout
3. Try hovering over images - you should see:
   - Brightness increase
   - Glowing border effect
   - Title and caption overlay
   - Corner glow effect

### Test 4: API Responses

**List Gallery (Public):**
```bash
curl http://localhost:8000/api/gallery/
```

Expected response:
```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "uuid-here",
      "title": "Image Title",
      "image": "/media/gallery/image.jpg",
      "image_url": "http://localhost:8000/media/gallery/image.jpg",
      "grid_column": 1,
      "grid_row": 1,
      "flex_width": "1.5fr",
      "display_order": 0,
      "alt_text": "Alt text",
      "caption": "Caption text",
      "is_active": true,
      "created_at": "2024-...",
      "updated_at": "2024-..."
    }
  ]
}
```

## File Structure

### Backend Files
```
server/
├── api/
│   ├── models.py              # ImageGalleryItem model
│   ├── serializers.py         # ImageGalleryItemSerializer
│   ├── views/
│   │   ├── gallery_views.py   # ImageGalleryViewSet (NEW)
│   │   └── __init__.py        # Updated with ImageGalleryViewSet export
│   ├── urls.py                # Gallery router registered
│   └── migrations/
│       └── 0002_imagegalleryitem.py  # Migration file
```

### Frontend Files
```
client/
├── components/
│   └── image-carousel.tsx     # Updated to fetch from API
├── app/
│   ├── page.tsx               # Homepage with carousel
│   └── dashboard/admin/gallery/
│       └── page.tsx           # Admin gallery management (NEW)
```

## Configuration

### CORS Settings (Already Configured)
The backend is configured to accept requests from:
- localhost:3000
- 127.0.0.1:3000
- localhost:8000
- 0.0.0.0

Settings in `server/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:8000',
    'http://0.0.0.0:3000',
]
```

### Media Files
Images are uploaded to: `server/media/gallery/`

Make sure this directory exists and has proper permissions.

## Troubleshooting

### Issue: Images not showing on homepage
**Solution:**
1. Check browser console for fetch errors
2. Verify backend is running: `http://localhost:8000/api/gallery/`
3. Check CORS errors in browser console
4. Ensure at least one image exists in database

### Issue: Can't upload images in admin
**Solution:**
1. Check that you're logged in as admin user
2. Verify admin role is set to `'admin'` in database
3. Check browser console for form submission errors
4. Ensure form data includes image file

### Issue: Images displaying but stretched
**Solution:**
1. Adjust `flex_width` values in admin
2. Use values: 0.5fr, 0.9fr, 1fr, 1.5fr, 2fr, 2.5fr
3. Higher values = wider images
4. Preview will show correct layout

### Issue: "Unauthorized" errors when creating/editing
**Solution:**
1. Ensure you're logged in as an admin user
2. Check user.role == 'admin' in database
3. Token authentication may be required
4. Check authentication headers in network tab

## API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/api/gallery/` | Public | List all active images |
| POST | `/api/gallery/` | Admin | Create new image |
| GET | `/api/gallery/{id}/` | Public | Get single image |
| PATCH | `/api/gallery/{id}/` | Admin | Update image |
| DELETE | `/api/gallery/{id}/` | Admin | Delete image |
| POST | `/api/gallery/reorder/` | Admin | Reorder images |
| POST | `/api/gallery/{id}/toggle_active/` | Admin | Toggle active status |

## Sample Test Data

Two sample gallery items are pre-created in the database:
- "Sample Image 1" - flex_width: 2fr, display_order: 0
- "Sample Image 2" - flex_width: 1.5fr, display_order: 1

These have no actual image files. To use them:
1. Edit each item
2. Upload an image file
3. They'll display on homepage

## Next Steps

### Optional Enhancements
1. **Drag-and-drop reordering** - Add react-beautiful-dnd
2. **Image cropping** - Add cropper.js for better control
3. **Batch operations** - Multi-select and bulk actions
4. **Image optimization** - Sharp/imagemin for thumbnails
5. **S3 storage** - Move images to cloud storage
6. **Image gallery pagination** - Load more vs show all
7. **Mobile responsive** - Adjust row heights for mobile

### Production Checklist
- [ ] Update API URLs from localhost to production domain
- [ ] Configure static/media file serving
- [ ] Set up image CDN or S3 storage
- [ ] Add image size validation
- [ ] Implement rate limiting on API
- [ ] Add request logging and monitoring
- [ ] Set up automated backups

## Support

For issues or questions:
1. Check this documentation first
2. Review browser console for error messages
3. Check Django server logs for backend errors
4. Verify CORS configuration
5. Test API directly with curl/Postman
