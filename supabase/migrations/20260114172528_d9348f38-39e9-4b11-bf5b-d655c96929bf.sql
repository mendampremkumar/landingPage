-- Allow public to insert waitlist submissions (for signups)
CREATE POLICY "Anyone can submit to waitlist"
ON public.waitlist_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Deny all read access to public (only service role can read)
CREATE POLICY "No public read access"
ON public.waitlist_submissions
FOR SELECT
USING (false);

-- Deny all update access to public
CREATE POLICY "No public update access"
ON public.waitlist_submissions
FOR UPDATE
USING (false);

-- Deny all delete access to public
CREATE POLICY "No public delete access"
ON public.waitlist_submissions
FOR DELETE
USING (false);