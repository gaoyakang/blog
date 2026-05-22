import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // 先查询是否存在该文章的记录
    const { data: existingPost, error: fetchError } = await supabaseServer
      .from('post_views')
      .select('id, views')
      .eq('slug', slug)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching post views:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch post views' }, { status: 500 });
    }

    if (existingPost) {
      // 更新现有记录
      const { data, error } = await supabaseServer
        .from('post_views')
        .update({ views: existingPost.views + 1, updated_at: new Date().toISOString() })
        .eq('id', existingPost.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating post views:', error);
        return NextResponse.json({ error: 'Failed to update post views' }, { status: 500 });
      }

      return NextResponse.json({ views: data.views });
    } else {
      // 创建新记录
      const { data, error } = await supabaseServer
        .from('post_views')
        .insert({ slug, views: 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
        .select()
        .single();

      if (error) {
        console.error('Error creating post views:', error);
        return NextResponse.json({ error: 'Failed to create post views' }, { status: 500 });
      }

      return NextResponse.json({ views: data.views });
    }
  } catch (error) {
    console.error('Unexpected error in view API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from('post_views')
      .select('views')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ views: 0 });
      }
      console.error('Error fetching post views:', error);
      return NextResponse.json({ error: 'Failed to fetch post views' }, { status: 500 });
    }

    return NextResponse.json({ views: data.views });
  } catch (error) {
    console.error('Unexpected error in view API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
