# aap-sink-utforsker


For å kjøre applikasjonen

```
yarn install
yarn dev
```

For å få kontakt med sink-applikasjonen så må den portforwardes fra github cloud til en port på din maskin. 


```
kubectl port-forward service/sink 3001:80 -n aap
```
