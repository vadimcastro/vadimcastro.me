output "cloudfront_domain" {
  value = aws_cloudfront_distribution.frontend.domain_name
}

output "api_endpoint" {
  value = aws_apigatewayv2_api.main.api_endpoint
}

output "dynamodb_table" {
  value = aws_dynamodb_table.auth.name
}