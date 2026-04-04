export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          benefits: string[]
          price: number
          stock: number
          category: string
          brand: string
          images: string[]
          status: 'available' | 'unavailable'
          usage_tips: string
          slug: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['products']['Insert']>
      }
      services: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          duration: string
          includes: string[]
          support_level: string
          type: string
          active: boolean
          popular: boolean
          currency: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['services']['Insert']>
      }
      orders: {
        Row: {
          id: string
          client_id: string
          items: OrderItem[]
          total: number
          status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['orders']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['orders']['Insert']>
      }
      clients: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          goal: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['clients']['Insert']>
      }
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          goal: string
          service_interest: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['leads']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['leads']['Insert']>
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          category: string
          cover_image: string | null
          published: boolean
          read_time: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          photo: string | null
          goal: string
          quote: string
          result: string
          before_img: string | null
          after_img: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }
      challenges: {
        Row: {
          id: string
          name: string
          duration_days: number
          description: string
          price: number
          currency: string
          includes: string[]
          active: boolean
          popular: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['challenges']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['challenges']['Insert']>
      }
    }
  }
}

export type OrderItem = {
  product_id: string
  name: string
  price: number
  quantity: number
  image: string
}

export type CartItem = OrderItem & {
  slug: string
}
