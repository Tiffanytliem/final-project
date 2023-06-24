set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."Products" (
	"productId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"stock" int NOT NULL,
	"price" int NOT NULL,
	CONSTRAINT "Products_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Users" (
	"userId" serial NOT NULL,
	"emailAddress" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Carts" (
	"cartId" serial NOT NULL,
	"userId" int NOT NULL,
	"totalCartPrice" int NOT NULL,
	CONSTRAINT "Carts_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Cart Items" (
	"itemId" serial NOT NULL,
	"productId" int NOT NULL,
	"cartId" int NOT NULL,
	"image" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"quantity" int NOT NULL,
	"price" int NOT NULL,
	"totalPrice" int NOT NULL,
	CONSTRAINT "Cart Items_pk" PRIMARY KEY ("itemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Orders" (
	"orderId" int NOT NULL,
	"userId" int NOT NULL,
	"cartId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."Images" (
	"imageId" serial NOT NULL,
	"productId" int NOT NULL,
	"image" TEXT NOT NULL,
	CONSTRAINT "Images_pk" PRIMARY KEY ("imageId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Users" ADD CONSTRAINT "Users_fk0" FOREIGN KEY ("cartId") REFERENCES "Carts"("cartId");

ALTER TABLE "Carts" ADD CONSTRAINT "Carts_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");

ALTER TABLE "Cart Items" ADD CONSTRAINT "Cart Items_fk0" FOREIGN KEY ("productId") REFERENCES "Products"("productId");
ALTER TABLE "Cart Items" ADD CONSTRAINT "Cart Items_fk1" FOREIGN KEY ("cartId") REFERENCES "Carts"("cartId");

ALTER TABLE "Orders" ADD CONSTRAINT "Orders_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_fk1" FOREIGN KEY ("cartId") REFERENCES "Carts"("cartId");

ALTER TABLE "Images" ADD CONSTRAINT "Images_fk0" FOREIGN KEY ("productId") REFERENCES "Products"("productId");
