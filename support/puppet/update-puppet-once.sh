#!/bin/bash

if [ -f "/root/puppet-first-time-update.run" ]; then
    exit
fi

apt-get update
apt-get install puppet -y
touch /root/puppet-first-time-update.run
