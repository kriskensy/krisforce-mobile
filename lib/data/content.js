import { supabase } from "../supabase";

export const contentData = {

  getBrandInfo: async () => {
    const { data } = await supabase
      .from('site_content')
      .select('key, value')
      .in('key', ['nav_brand_logo', 'nav_brand_name']);

    const logoUrl = data?.find(item => item.key === 'nav_brand_logo')?.value || null;
    const brandName = data?.find(item => item.key === 'nav_brand_name')?.value || null;

    return { logoUrl, brandName };
  }
}