# prometheus_node

**exception: error
method: 
repository: auth-service
state= 'SUCCESS'
status=200/304
uri='/get/id'**


For checking Prometheus metrics

hit the URL **http://localhost:3000/metrics**


Sample Response:

# HELP crud_operations_total Total number of CRUD operations
# TYPE crud_operations_total counter
crud_operations_total{path="/user/get",method="GET",status_code="200"} 12
