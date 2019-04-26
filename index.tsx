import { digraph } from 'graphviz'
import { safeLoadAll } from 'js-yaml'
import { readFileSync } from 'fs'
import { v1, apps } from 'kubernetes-models'
import { extensions } from 'kubernetes-models/api'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const g = digraph('map')
const doc = safeLoadAll(readFileSync('test/fixtures/big.yaml', 'utf8'))

type Resource =
  | apps.v1beta1.Deployment
  | v1.Secret
  | v1.ConfigMap
  | v1.PersistentVolumeClaim
  | v1.Service
  | extensions.v1beta1.Ingress

doc.forEach((resource: Resource) => {
  if (!resource.metadata) {
    console.log('untrackable', resource)
    return
  }
  switch (resource.kind) {
    case 'Deployment': {
      g.addNode(`deployment.${resource.metadata.name}`)
      return
    }
    case 'Secret': {
      g.addNode(`secret.${resource.metadata.name}`, {
        label: renderToStaticMarkup(
          <table>
            <thead>
              <th>
                Secret
                <br />
                name: {resource.metadata.name}
              </th>
            </thead>
            <tbody>
              {Object.keys((resource as v1.Secret).data || {}).map(key => {
                return (
                  <tr>
                    <td data-port={key}>{key}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>,
        ),
      })
      return
    }
    case 'ConfigMap': {
      g.addNode(`configmap.${resource.metadata.name}`, {
        label: renderToStaticMarkup(
          <table>
            <thead>
              <th>
                ConfigMap
                <br />
                name: {resource.metadata.name}
              </th>
            </thead>
            <tbody>
              {Object.keys((resource as v1.Secret).data || {}).map(key => {
                return (
                  <tr>
                    <td data-port={key}>{key}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>,
        ),
      })
      return
    }
    case 'PersistentVolumeClaim': {
      let storageClassName = ''
      g.addNode(`persistentvolumeclaim.${resource.metadata.name}`, {
        label: renderToStaticMarkup(
          <table>
            <thead>
              <th>
                PersistentVolumeClaim
                <br />
                name: {resource.metadata.name}
              </th>
            </thead>
            <tbody>
              {(resource as any).spec.storageClassName ? (
                <tr>
                  <td>storageClassName</td>
                  <td>{(resource as any).spec.storageClassName}</td>
                </tr>
              ) : null}
              {(resource as any).spec.capacity && (resource as any).spec.capacity.storage ? (
                <tr>
                  <td>storage</td>
                  <td>{(resource as any).spec.capacity.storage}</td>
                </tr>
              ) : null}
            </tbody>
          </table>,
        ),
      })
      return
    }
    case 'Service': {
      g.addNode(`service.${resource.metadata.name}`, {
        label: renderToStaticMarkup(
          <table>
            <thead>
              <th>
                Service
                <br />
                name: {resource.metadata.name}
              </th>
            </thead>
            <tbody>
              <tr>
                <td>selectors</td>,
                {Object.keys((resource as v1.Service).spec!.selector || {}).map(key => {
                  return (
                    <td>
                      {key}:{(resource as v1.Service).spec!.selector![key]}
                    </td>
                  )
                })}
                )}
              </tr>
              <tr>
                <td>ports</td>,
                {((resource as v1.Service).spec!.ports || []).map(port => {
                  return (
                    <td data-port={port.name}>
                      {port.name}({port.port})
                    </td>
                  )
                })}
                )}
              </tr>
            </tbody>
          </table>,
        ),
      })
      return
    }
    case 'Ingress': {
      g.addNode(`ingress.${resource.metadata.name}`)
      return
    }
    default:
  }
})

console.log(g.to_dot())
