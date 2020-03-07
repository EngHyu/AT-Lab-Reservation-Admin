FROM node:13.10.1-alpine3.11
EXPOSE 3000 5000

ENV WORKSPACE /workspace
RUN apk add --no-cache python make g++
COPY . /workspace
WORKDIR $WORKSPACE

ENV BACKEND /workspace/backend
RUN cd $BACKEND && yarn

ENV FRONTEND /workspace/frontend
RUN cd $FRONTEND && yarn && yarn build

ENTRYPOINT ["sh"]
CMD ["./run.sh"]