package QuickNotes_App.repository;

import QuickNotes_App.model.Note;
import QuickNotes_App.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByUser(User user);

    // SEARCH NOTES
    List<Note> findByUserAndTitleContainingIgnoreCaseOrUserAndContentContainingIgnoreCase(
            User user1,
            String title,

            User user2,
            String content
    );
}
