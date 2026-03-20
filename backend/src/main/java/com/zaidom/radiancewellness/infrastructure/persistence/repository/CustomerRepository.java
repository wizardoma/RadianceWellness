package com.zaidom.radiancewellness.infrastructure.persistence.repository;

import com.zaidom.radiancewellness.domain.enums.CustomerStatus;
import com.zaidom.radiancewellness.domain.model.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {

    Optional<Customer> findByEmail(String email);

    Optional<Customer> findByPhone(String phone);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    List<Customer> findByStatus(CustomerStatus status);

    Page<Customer> findByStatus(CustomerStatus status, Pageable pageable);

    @Query("SELECT c FROM Customer c WHERE " +
           "LOWER(c.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "c.phone LIKE CONCAT('%', :search, '%')")
    Page<Customer> search(@Param("search") String search, Pageable pageable);

    @Query("SELECT c FROM Customer c WHERE c.status = :status AND (" +
           "LOWER(c.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "c.phone LIKE CONCAT('%', :search, '%'))")
    Page<Customer> searchByStatus(@Param("search") String search, @Param("status") CustomerStatus status, Pageable pageable);
}
