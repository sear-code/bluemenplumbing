-- Create quotes table
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    quote_id TEXT NOT NULL UNIQUE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    property_type TEXT,
    address_street TEXT,
    address_city TEXT,
    address_state TEXT,
    address_zip TEXT,
    selected_services JSONB DEFAULT '[]'::jsonb,
    selected_categories JSONB DEFAULT '[]'::jsonb,
    custom_service TEXT,
    problem_description TEXT,
    urgency TEXT DEFAULT 'standard',
    estimated_price NUMERIC DEFAULT 0,
    estimated_duration INTEGER DEFAULT 120,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'contacted', 'approved', 'completed', 'cancelled')),
    access_notes TEXT,
    preferred_datetime TIMESTAMP WITH TIME ZONE,
    photos JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quotes_email ON public.quotes(email);
CREATE INDEX IF NOT EXISTS idx_quotes_quote_id ON public.quotes(quote_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON public.quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON public.quotes(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Create policy for public quote insertion
CREATE POLICY "Allow public insert access to quotes"
    ON public.quotes FOR INSERT
    WITH CHECK (true);

-- Create policy for authenticated read access to quotes
CREATE POLICY "Allow authenticated read access to quotes"
    ON public.quotes FOR SELECT
    USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_quotes_updated_at
    BEFORE UPDATE ON public.quotes
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
