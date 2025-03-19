# add supplier
curl -X POST "http://localhost:8080/suppliers" -H "Content-Type: application/json" -d '{
  "name": "New Distributors Ltd.",
  "contact_person": "Jane Dee",
  "phone": "+1234334890",
  "email": "jane@bookdistributors.com",
  "address": "123 Market Street",
  "city": "New York",
  "country": "Kenya",
  "website": "http://janedistributors.com"
}'

# get all suppliers
curl -X GET "http://localhost:8080/suppliers"



# get a supplier by id
curl -X GET "http://localhost:8080/suppliers/1"

# update a supplier
curl -X PUT "http://localhost:8080/suppliers/1" -H "Content-Type: application/json" -d '{
  "name": "Updated Supplier",
  "contact_person": "Jane Doe",
  "phone": "+1122334455",
  "email": "jane@updatedsupplier.com",
  "address": "789 Book Street",
  "city": "Los Angeles",
  "country": "USA",
  "website": "http://updatedsupplier.com"
}'

#delete a supplier
curl -X DELETE "http://localhost:8080/suppliers/1"

