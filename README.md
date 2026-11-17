# Arithmetic Operations

This project performs addition, subtraction, multiplication and division. It includes a CLI program, automated tests, a small HTTP application, a Dockerfile, a Jenkins pipeline and Kubernetes manifests.

## Run the CLI program

```powershell
node arithmetic.js add 10 5
node arithmetic.js subtract 10 5
node arithmetic.js multiply 6 7
node arithmetic.js divide 20 4
```

## Run the tests

```powershell
npm test
```

## Run the web application locally

```powershell
npm start
```

Open `http://localhost:3000/api/calculate?operation=add&a=10&b=5` to see the JSON result.

## Build and run with Docker

```powershell
docker build -t arithmetic-operations:latest .
docker run --rm -p 3000:3000 arithmetic-operations:latest
```

## Kubernetes

Jenkins runs the tests, builds the Docker image, creates a ConfigMap from the source files, applies the Kubernetes manifests, and waits for the deployment rollout.

```powershell
kubectl create configmap arithmetic-operations-source --from-file=arithmetic.js --from-file=server.js --dry-run=client -o yaml | kubectl apply -f -
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get deployments,pods,services -l app=arithmetic-operations
```
