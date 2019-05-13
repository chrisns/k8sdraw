# k8sdraw - abandoned
I saw, https://github.com/containership/konstellate and abandoned this project since that answers most my own desires, if you see a benefit in this please let me know

The point of this project is to allow graphical drawings of kubernetes infrastructure.

Based on static yaml files rather than interrogating the running infrastructure, the initial ambition is to show a static view as is, but it'd be even better to render diffs too, think a PR helper that'll add a visual diff graph highlighting the change.

Starting with primitives like deployments, statefulsets, services, ingress, persistentvolumeclaims, configmaps, secrets etc
So a k8s yaml file like [big.yaml](https://github.com/chrisns/k8sdraw/blob/master/test/fixtures/big.yaml) will result in a graph like [big.dot](https://github.com/chrisns/k8sdraw/blob/master/test/fixtures/big.dot)

Or to draw that for you:
![](https://6n1t2csgfa.execute-api.us-east-1.amazonaws.com/latest?dot=chrisns/k8sdraw/master/test/fixtures/big.dot)
