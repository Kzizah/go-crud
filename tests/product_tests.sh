#add product
ccurl -X POST http://localhost:8080/products \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Gaming Laptop",
           "description": "High-performance gaming laptop",
           "category_id": 1,
           "supplier_id": 2,
           "price": 1500.50,
           "stock": 10,
           "sku": "GAMING123",
           "image_url": "https://example.com/laptop.jpg",
           "created_at": "2024-03-19T12:00:00Z",
           "updated_at": "2024-03-19T12:00:00Z"
         }' | jq .


# get all products
curl -X GET http://localhost:8080/products

# get a single product
curl -X GET http://localhost:8080/products/1

# update product
curl -X PUT http://localhost:8080/products/1 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Gaming Laptop",
           "category_id": 1,
           "supplier_id": 2,
           "price": 1500.50
         }'
# delete product
curl -X DELETE http://localhost:8080/products/1
