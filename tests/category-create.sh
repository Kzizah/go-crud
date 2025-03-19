# category create

curl -X POST http://localhost:8080/categories \
-H "Content-Type: application/json" \
-d '{"name": "Electronics"}'

# category fetch
curl -X GET http://localhost:8080/categories

# get a single category
curl -X GET http://localhost:8080/categories/1

#update category
curl -X PUT http://localhost:8080/categories/1 \
-H "Content-Type: application/json" \
-d '{"name": "Updated Electronics"}'

#delete category
curl -X DELETE http://localhost:8080/categories/1
