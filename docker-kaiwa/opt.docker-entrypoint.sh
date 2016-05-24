#!/bin/bash

# démarrage d'openfire
/opt/openfire/bin/openfire start

# démarrage de Kaiwa au premier plan
export PATH=$PATH:/opt/node/bin/
cd /opt/kaiwa/
node server

