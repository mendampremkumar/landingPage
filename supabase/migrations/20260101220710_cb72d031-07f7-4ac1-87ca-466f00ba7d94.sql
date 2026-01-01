-- Create table for tracking waitlist submissions to prevent duplicates
CREATE TABLE public.waitlist_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  payload JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  attempt_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_waitlist_submissions_idempotency_key ON public.waitlist_submissions(idempotency_key);
CREATE INDEX idx_waitlist_submissions_email ON public.waitlist_submissions(email);

-- Enable RLS
ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Allow edge functions to manage this table (service role only, no public access)
-- No public RLS policies needed as this is only accessed by the edge function using service role