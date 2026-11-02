ALTER TABLE "Region" ADD COLUMN IF NOT EXISTS polygon geometry(Polygon, 4326);
CREATE INDEX IF NOT EXISTS region_polygon_idx ON "Region" USING GIST (polygon);