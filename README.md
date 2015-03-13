# etcd-json-logs

Raw etcd log lines go in. JSON log records go out.

```bash
npm -g install etcd-json-logs

cat /var/log/etcd.log | etcd-json-logs
```

Uses [bunyan](https://github.com/trentm/node-bunyan) to log JSON records.

## License 

[MIT License](LICENSE).
