FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN go install github.com/swaggo/swag/cmd/swag@latest && \
    go mod tidy && \
    swag init && \
    go build -o main .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]
