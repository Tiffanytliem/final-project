-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

insert into "images"
    ("productId","image")
    values
      ('1','/images/1-Document-Box-1.webp')

insert into "products" (
    "name",
    "price",
) values (
  'Documents Box - Calm',
  16.99
), (
  'Yuzu Essential Oil and Stone Diffuser Gift Set',
  60.00
), (
  'Linen Jewelry Organization & Storage Box',
  130.99
), (
  'Tea Ceremony Handmade Ceramic Matcha Bowl',
  45.00
), (
  'Linen Story Box Frame',
  40.00
), (
  'Bamboo Knotted Chopstick Rest',
  8.00
), (
  'Ceremonial Ceramic Matcha Bowl',
  65.00
), (
  'Linen Magnetic Planning Board',
  59.99
), (
  'Bamboo Vertical Paper Holder',
  37.99
), (
  'Bamboo Monitor Stand',
  49.99
), (
  'Polished Stone Diffuser',
  32.00
), (
  'Citrus Navy Furoshiki',
  12.00
);

insert all into "product" (
  "description", "stock"
) values (
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam consequat erat eu velit iaculis, id porta mi feugiat. Sed vel laoreet justo. Suspendisse potenti. Etiam condimentum augue eget metus dapibus, ut maximus nisl rutrum. Nam consectetur ligula nec nulla sagittis, sit amet convallis velit porta. Pellentesque purus nunc, consequat vel nibh ut, placerat blandit urna. Integer venenatis nisi quis congue suscipit. Integer vestibulum massa elementum tristique fermentum.', 100
)
