# Watermark API Service

A NestJS-based API for uploading images, applying text watermarks, and storing image metadata using MongoDB and Supabase Storage.

## Features

- Upload images via REST API (with Swagger UI support)
- Apply custom text watermarks to images using [sharp](https://github.com/lovell/sharp)
- Store watermarked images in [Supabase Storage](https://supabase.com/storage)
- Store image metadata (including public URL) in MongoDB
- Retrieve all watermarks or a single watermark by ID

## Tech Stack

- [NestJS](https://nestjs.com/) (Node.js framework)
- [Mongoose](https://mongoosejs.com/) (MongoDB ODM)
- [Supabase Storage](https://supabase.com/storage) (for file storage)
- [sharp](https://github.com/lovell/sharp) (image processing)
- [Swagger](https://swagger.io/) (API documentation)

## Installation

```bash
# Install dependencies
yarn install
# or
npm install
```

## Environment Variables

Create a `.env` file in the project root with the following:

```
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-service-role-key
```

- The Supabase bucket (e.g., `watermark`) must exist in your Supabase project.
- The bucket should be set to "public" for direct image access, or use signed URLs for private buckets.

## Running the App

```bash
# development
yarn run start

# watch mode
yarn run start:dev

# production mode
yarn run start:prod
```

## API Usage

### Upload an Image with Watermark

- **Endpoint:** `POST /watermark`
- **Consumes:** `multipart/form-data`
- **Body:**
  - `text` (string): The watermark text
  - `picture` (file): The image file

### Get All Watermarks

- **Endpoint:** `GET /watermark`

### Get a Watermark by ID

- **Endpoint:** `GET /watermark/:id`

## Swagger UI

API documentation and file upload are available at:  
`http://localhost:3000/api` (default)


## Project Structure

```
src/
  watermark/
    watermark.controller.ts
    watermark.service.ts
    entities/
      watermark.entity.ts
    dto/
      create-watermark.dto.ts
      update-watermark.dto.ts
  fileManagement/
    filemanagement.service.ts
    filemanagement.module.ts
  util/
    watermark.ts
```

## License

Nest is [MIT licensed](LICENSE).

---

**Author:** [Kwadw0] 
**Framework:** [NestJS](https://nestjs.com/)