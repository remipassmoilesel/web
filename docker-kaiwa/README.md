# Dockerfile to test Kaiwa / Openfire


```
# Install Docker on Ubuntu:
$ curl -fsSL https://get.docker.com/ | sh

# Download and setup an Openfire server (accounts, ...) with
an embedded database. Then copy it in opt.openfire/

# Adapt the file 'opt.kaiwa.dev_config.json' with the server domain name

# Run a container
$ ./build-and-launch.sh

```