---
description: 
globs: 
alwaysApply: true
---
# Java Spring Boot Clean Architecture Rule

## Project Structure & Architecture
- Follow Clean Architecture with 4 layers: `domain`, `application`, `infrastructure`, `presentation`
- Package structure: `com.{company}.{service}.{layer}.{feature}`
- Use dependency injection with `@RequiredArgsConstructor` from Lombok
- Keep business logic in use cases, not controllers
- One feature per package grouping

## Entity Design Standards
- All entities MUST extend `BaseEntity` with: `id`, `createdAt`, `updatedAt`, `deletedAt`, `isDeleted`
- Use custom ID generator with `@GenericGenerator`
- Implement soft delete with `@Where(clause = "is_deleted = false")`
- Use `@Entity`, `@Table(name = "table_name")`, `@JoinColumn` annotations
- Lazy loading for relationships: `@ManyToOne(fetch = FetchType.LAZY)`
- Use Lombok annotations: `@Builder`, `@Getter`, `@Setter`, `@NoArgsConstructor`, `@AllArgsConstructor`
- Use `@PrePersist` for business logic during entity creation

## Repository Pattern
- Extend `JpaRepository<Entity, String>` (String ID due to custom generator)
- Use `@Repository` annotation
- Method naming conventions: `findByPropertyName`, `existsByProperty`, `findByPropertyIgnoreCase`
- Return `Optional<T>` for single results
- Return `List<T>` for multiple results
- No business logic in repositories

## Use Case Pattern
- One use case per business operation in `application.usecases.{feature}`
- Use `@Component` annotation
- Use `@Transactional` for data modifications
- Constructor injection with `@RequiredArgsConstructor`
- Public `execute()` method as single entry point
- Add `@Slf4j` for logging
- Name classes with `UseCase` suffix (e.g., `CreateUserUseCase`)

## Controller Design
- Use `@RestController` with `@RequestMapping("/api/v1/{resource}")`
- Constructor injection with `@RequiredArgsConstructor`
- Return `ResponseEntity<ApiResponse<T>>` for all endpoints
- Use `@Valid` for request validation
- Use static imports: `import static ...ApiResponseUtils.okResponse`
- HTTP methods: `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`
- Path variables: `@PathVariable String id`
- Request bodies: `@RequestBody @Valid RequestDTO request`

## DTO Standards
- **Requests**: End with `Request` (e.g., `CreateUserRequest`)
- **Responses**: End with `ResponseDTO` or `DTO` (e.g., `UserResponseDTO`, `UserDTO`)
- Use Lombok: `@Data`, `@Builder`, `@NoArgsConstructor`, `@AllArgsConstructor`
- Add validation: `@NotBlank`, `@NotEmpty`, `@NotNull`, `@Valid`
- Group DTOs: `presentation.dtos.requests` and `presentation.dtos.responses`
- Application DTOs in `application.dtos`

## API Response Pattern
```java
// Standard response wrapper
public class ApiResponse<T> {
    private boolean status;
    private String message;
    private T data;
    
    // Static factory methods
    public static ApiResponse<?> Error(String message);
    public static <T> ApiResponse<T> Data(T data);
    public static <T> ApiResponse<T> Data(T data, String message);
    public static ApiResponse<?> Nothing(String message);
    public static ApiResponse<?> Nothing();
}

// Controller usage
return okResponse(data);           // Success with data
return okResponse();              // Success without data
```

## Exception Handling
- Custom exceptions in `infrastructure.config.exception`
- Base exception: `AgenpoException` or similar
- Specific exceptions: `ResourceNotFoundException`, `ValidationException`, `DuplicateObjectException`
- Use `@ControllerAdvice` for global exception handling
- Map exceptions to HTTP status codes
- Return `ApiResponse.Error(message)` for all errors
- Log appropriately: `log.info()` for business exceptions, `log.error()` for system exceptions

## Configuration Standards
- Profile-specific configs: `application.yml`, `application-{profile}.yml`
- Use environment variables with defaults: `${VAR_NAME:default_value}`
- JWT configuration in properties with secret and expiration
- Database configuration per environment
- Service URLs configuration for external services

## Security & Validation
- Use Bean Validation annotations on DTOs
- Security context utilities for current user data
- JWT token handling
- Transaction boundaries in use cases only
- Input validation at controller level

## Naming Conventions
- Classes: PascalCase
- Methods/Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Packages: lowercase with dots
- Database tables: snake_case
- Use descriptive names reflecting business operations

## Logging Standards
- Use `@Slf4j` annotation
- Log business operations: `log.info("Operation description {}", param)`
- Log errors with stack trace: `log.error("Error message", exception)`
- Log request/response for debugging: `log.debug()`

## Dependencies & Versions
- Spring Boot 3.x with Java 21
- PostgreSQL with JPA/Hibernate
- Lombok for boilerplate reduction
- Spring Cloud for service discovery (optional)
- OpenFeign for external service communication
- SpringDoc OpenAPI for documentation
- JWT library for authentication

## Service Layer Communication
- Use OpenFeign clients for external service calls
- Define service interfaces in `application.services`
- Implement clients in `infrastructure.external.clients`
- Handle service failures gracefully
- Use circuit breaker patterns for resilience

## Testing Patterns
- Unit tests for use cases
- Integration tests for repositories
- Controller tests with MockMvc
- Use `@SpringBootTest` for integration tests
- Mock external dependencies

## Code Quality
- Use final fields with constructor injection
- Avoid field injection (`@Autowired` on fields)
- Keep methods small and focused
- Use meaningful variable and method names
- Handle null cases with Optional
- Follow single responsibility principle
