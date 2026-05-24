package QuickNotes_App.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import QuickNotes_App.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
}