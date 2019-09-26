FROM fsharp:netcore
RUN apt-get update && apt-get install -y wget tar gpg

# Install vscode
# Take latest release from https://github.com/cdr/code-server/releases/latest
RUN wget https://github.com/cdr/code-server/releases/download/1.1156-vsc1.33.1/code-server1.1156-vsc1.33.1-linux-x64.tar.gz \
     && tar -xzvf code-server1.1156-vsc1.33.1-linux-x64.tar.gz && mv code-server1.1156-vsc1.33.1-linux-x64 /usr/local/bin/vscode && chmod +x /usr/local/bin/vscode/code-server

# Install nvm
ENV NVM_DIR /home/.nvm
RUN mkdir -p $NVM_DIR
ENV NODE_VERSION 12.11.0
RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && apt-get install -y --no-install-recommends yarn
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/v$NODE_VERSION/bin:$PATH

# Install gosu
RUN apt-get install -y gosu

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
