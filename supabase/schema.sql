-- ============================================================
-- Andrea Musar Website — Supabase Database Schema
-- Run this SQL in your Supabase project: SQL Editor > New Query
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: products
-- ============================================================
CREATE TABLE IF NOT EXISTS public.products (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT NOT NULL DEFAULT '',
  benefits      TEXT[] NOT NULL DEFAULT '{}',
  price         NUMERIC(10,2) NOT NULL DEFAULT 0,
  currency      TEXT NOT NULL DEFAULT 'USD',
  stock         INTEGER NOT NULL DEFAULT 0,
  category      TEXT NOT NULL DEFAULT 'proteinas',
  brand         TEXT NOT NULL DEFAULT '',
  images        TEXT[] NOT NULL DEFAULT '{}',
  status        TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available','unavailable')),
  usage_tips    TEXT NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "products_public_read" ON public.products
  FOR SELECT USING (true);

-- Allow authenticated admin write
CREATE POLICY "products_admin_write" ON public.products
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- TABLE: services
-- ============================================================
CREATE TABLE IF NOT EXISTS public.services (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  description     TEXT NOT NULL DEFAULT '',
  price           NUMERIC(10,2) NOT NULL DEFAULT 0,
  currency        TEXT NOT NULL DEFAULT 'USD',
  duration        TEXT NOT NULL DEFAULT '',
  includes        TEXT[] NOT NULL DEFAULT '{}',
  support_level   TEXT NOT NULL DEFAULT '',
  type            TEXT NOT NULL DEFAULT 'online',
  active          BOOLEAN NOT NULL DEFAULT true,
  popular         BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "services_public_read" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "services_admin_write" ON public.services
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- TABLE: clients
-- ============================================================
CREATE TABLE IF NOT EXISTS public.clients (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  phone       TEXT NOT NULL DEFAULT '',
  goal        TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clients_admin_only" ON public.clients
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- TABLE: orders
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id   UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  items       JSONB NOT NULL DEFAULT '[]',
  total       NUMERIC(10,2) NOT NULL DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "orders_admin_only" ON public.orders
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- TABLE: leads
-- ============================================================
CREATE TABLE IF NOT EXISTS public.leads (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT NOT NULL DEFAULT '',
  goal              TEXT NOT NULL DEFAULT '',
  service_interest  TEXT NOT NULL DEFAULT '',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a lead (public contact form)
CREATE POLICY "leads_public_insert" ON public.leads
  FOR INSERT WITH CHECK (true);

-- Only authenticated admin can read/update/delete
CREATE POLICY "leads_admin_read" ON public.leads
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "leads_admin_delete" ON public.leads
  FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================================
-- TABLE: blog_posts
-- ============================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  content       TEXT NOT NULL DEFAULT '',
  excerpt       TEXT NOT NULL DEFAULT '',
  category      TEXT NOT NULL DEFAULT 'entrenamiento',
  cover_image   TEXT,
  read_time     TEXT NOT NULL DEFAULT '5 min',
  published     BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts only
CREATE POLICY "blog_public_read" ON public.blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "blog_admin_write" ON public.blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- TABLE: testimonials
-- ============================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name   TEXT NOT NULL,
  photo         TEXT,
  goal          TEXT NOT NULL DEFAULT '',
  quote         TEXT NOT NULL DEFAULT '',
  result        TEXT NOT NULL DEFAULT '',
  before_img    TEXT,
  after_img     TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "testimonials_public_read" ON public.testimonials
  FOR SELECT USING (true);

CREATE POLICY "testimonials_admin_write" ON public.testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- TABLE: challenges
-- ============================================================
CREATE TABLE IF NOT EXISTS public.challenges (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  duration_days   INTEGER NOT NULL DEFAULT 30,
  description     TEXT NOT NULL DEFAULT '',
  price           NUMERIC(10,2) NOT NULL DEFAULT 0,
  currency        TEXT NOT NULL DEFAULT 'USD',
  includes        TEXT[] NOT NULL DEFAULT '{}',
  active          BOOLEAN NOT NULL DEFAULT true,
  popular         BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "challenges_public_read" ON public.challenges
  FOR SELECT USING (true);

CREATE POLICY "challenges_admin_write" ON public.challenges
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKET: product-images
-- Create this bucket manually in Supabase Storage dashboard
-- or run the management API:
--   POST /storage/v1/bucket  body: {"id":"product-images","name":"product-images","public":true}
-- ============================================================

-- ============================================================
-- SEED DATA (optional — remove in production)
-- ============================================================

INSERT INTO public.products (name, slug, description, benefits, price, currency, stock, category, brand, status, usage_tips)
VALUES
  ('Whey Protein Gold Standard', 'whey-protein-gold-standard', 'La proteina de suero mas vendida del mundo. 24g de proteina por servicio.',
   ARRAY['24g de proteina por servicio','Bajo en grasas y carbohidratos','Rapida absorcion post-entrenamiento'],
   89.90, 'USD', 15, 'proteinas', 'Optimum Nutrition', 'available',
   'Mezcla 1 scoop con 240ml de agua o leche. Consumir inmediatamente despues del entrenamiento.'),

  ('Pre-Workout C4 Original', 'pre-workout-c4-original', 'El pre-entreno #1 en ventas. Energia, foco y rendimiento explosivo.',
   ARRAY['Energia sostenida sin crash','Mejora el foco mental','Pump muscular intenso'],
   44.90, 'USD', 8, 'pre-entreno', 'Cellucor', 'available',
   'Mezcla 1 scoop con 180ml de agua y consume 20-30 minutos antes del entrenamiento.'),

  ('Creatina Monohidrato', 'creatina-monohidrato', 'Creatina monohidrato pura micronizada para maxima fuerza y volumen muscular.',
   ARRAY['Aumenta la fuerza maxima','Mejora la recuperacion','Incrementa el volumen muscular'],
   24.90, 'USD', 20, 'vitaminas', 'Optimum Nutrition', 'available',
   '5g diarios. Puede tomarse antes o despues del entrenamiento.');

INSERT INTO public.services (name, description, price, currency, duration, includes, support_level, type, active, popular)
VALUES
  ('Plan Basic Online', 'Ideal para comenzar tu transformacion con guia profesional desde casa.',
   99, 'USD', '1 mes',
   ARRAY['Plan de entrenamiento personalizado','Seguimiento semanal','Acceso a videos explicativos','Soporte por WhatsApp de lunes a viernes'],
   'Soporte por WhatsApp (lun-vie)', 'online', true, false),

  ('Plan Standard Online', 'Para quienes buscan resultados serios con acompanamiento constante.',
   159, 'USD', '1 mes',
   ARRAY['Plan de entrenamiento personalizado','Plan nutricional basico','Seguimiento bisemanal','Soporte ilimitado por WhatsApp','Ajustes mensuales del plan'],
   'Soporte ilimitado por WhatsApp', 'online', true, true),

  ('Plan Premium Online', 'La experiencia completa de coaching fitness y nutricional de elite.',
   229, 'USD', '1 mes',
   ARRAY['Plan de entrenamiento 100% personalizado','Plan nutricional completo','Video llamada semanal','Soporte 24/7 prioritario','Analisis de composicion corporal'],
   'Soporte 24/7 prioritario', 'online', true, false);

INSERT INTO public.challenges (name, duration_days, description, price, currency, includes, active, popular)
VALUES
  ('Reto 15 Dias', 15, 'Arranca tu transformacion en solo 15 dias con rutinas diarias.',
   29, 'USD', ARRAY['15 dias de rutinas en casa','Guia de alimentacion limpia','Grupo de WhatsApp de apoyo'], true, false),

  ('Reto 21 Dias', 21, 'Crea habitos saludables en 21 dias y nota el cambio real.',
   39, 'USD', ARRAY['21 dias de rutinas progresivas','Plan de alimentacion completo','Seguimiento semanal','Recetario saludable PDF'], true, true),

  ('Reto 30 Dias', 30, 'El reto definitivo para una transformacion completa en 30 dias.',
   49, 'USD', ARRAY['30 dias de rutinas intensas','Plan nutricional personalizado','Video llamada de seguimiento','Sesion de evaluacion final'], true, false);
