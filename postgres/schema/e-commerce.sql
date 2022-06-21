CREATE TABLE IF NOT EXISTS "users"(
    "id" serial PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "lastname" varchar(255),
    "email" varchar(255) NOT NULL UNIQUE,
    "password" varchar(255),
    "role" varchar(255) NOT NULL,
    "status" varchar(255) NOT NULL,
    "resetPasswordToken" varchar(255),
    "image" varchar(1000),
    "createdAt" timestamptz NOT NULL DEFAULT NOW(),
    "updatedAt" timestamptz NOT NULL DEFAULT NOW(),
    "deletedAt" timestamptz
);

CREATE TABLE IF NOT EXISTS "products" (
    "id" serial PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "description" text,
    "price" numeric(8, 2) NOT NULL DEFAULT 0,
    "image" varchar(1000),
    "quantity" smallint NOT NULL DEFAULT 0,
    "categories" varchar(255)[],
    "variants" varchar(255)[],
    "sizes" varchar(255)[],
    "userId" serial REFERENCES users(id),
    "createdAt" timestamptz NOT NULL DEFAULT NOW(),
    "updatedAt" timestamptz NOT NULL DEFAULT NOW(),
    "deletedAt" timestamptz
);

CREATE TABLE IF NOT EXISTS "orders" (
    "id" serial PRIMARY KEY,
    "total" numeric(8, 2) NOT NULL DEFAULT 0,
    "status" varchar(100),
    "userId" serial REFERENCES users(id),
    -- "products" serial[] REFERENCES products(id),
    "createdAt" timestamptz NOT NULL DEFAULT NOW(),
    "updatedAt" timestamptz NOT NULL DEFAULT NOW(),
    "deletedAt" timestamptz
);

CREATE TABLE IF NOT EXISTS "orders-products" (
    "orderId" serial REFERENCES orders(id),
    "productId" serial REFERENCES products(id)
);

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updatedAt = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_product_timestamp
BEFORE UPDATE ON "products"
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_order_timestamp
BEFORE UPDATE ON "orders"
FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();