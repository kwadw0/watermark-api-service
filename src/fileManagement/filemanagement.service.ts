import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class FileManagementService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  async uploadImage(
    file: Express.Multer.File,
    bucket: string,
    path: string,
  ): Promise<string> {
    try {
      const { data, error } = await this.supabase.storage
        .from(bucket)
        .upload(path, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (error) {
        throw new Error(error.message);
      }
      return data.path;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  }

  async getImageUrl(bucket: string, path: string): Promise<string> {
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  async deleteImage(bucket: string, path: string): Promise<void> {
    const { error } = await this.supabase.storage.from(bucket).remove([path]);
    if (error) {
      throw new Error(error.message);
    }
  }
}
