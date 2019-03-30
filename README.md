# k8sdraw

The point of this project is to allow graphical drawings of kubernetes infrastructure.

Starting with primitives like deployments, statefulsets, services, ingress, persistentvolumeclaims, configmaps, secrets etc
So a k8s yaml file like [big.yaml](https://github.com/chrisns/k8sdraw/blob/master/test/fixtures/big.yaml) will result in a graph like [big.dot](https://github.com/chrisns/k8sdraw/blob/master/test/fixtures/big.dot)

Or to draw that for you:
![](https://6n1t2csgfa.execute-api.us-east-1.amazonaws.com/latest?dot=chrisns/k8sdraw/master/test/fixtures/big.dot)
