package QuickNotes_App.controller;

import QuickNotes_App.model.Note;
import QuickNotes_App.model.User;
import QuickNotes_App.repository.NoteRepository;
import QuickNotes_App.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin("*")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    // Create note for user
    @PostMapping("/{username}")
    public Note createNote(@PathVariable String username,
                           @RequestBody Note note) {

        User user = userRepository.findByUsername(username);

        note.setUser(user);

        return noteRepository.save(note);
    }

    // Get notes of particular user
    @GetMapping("/{username}")
    public List<Note> getUserNotes(@PathVariable String username) {

        User user = userRepository.findByUsername(username);

        return noteRepository.findByUser(user);
    }
    @PutMapping("/{id}")
    public Note updateNote(@PathVariable Long id,
                        @RequestBody Note updatedNote) {

        Note existingNote = noteRepository.findById(id).orElse(null);

        if (existingNote != null) {

            existingNote.setTitle(updatedNote.getTitle());
            existingNote.setContent(updatedNote.getContent());

            return noteRepository.save(existingNote);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public String deleteNote(@PathVariable Long id) {

        noteRepository.deleteById(id);

        return "Note deleted successfully!";
    }
    @GetMapping("/search/{username}")
    public List<Note> searchNotes(
    
            @PathVariable String username,
    
            @RequestParam String keyword
    ) {
    
        User user = userRepository
                .findByUsername(username)
                .orElseThrow();
    
        return noteRepository
                .findByUserAndTitleContainingIgnoreCaseOrUserAndContentContainingIgnoreCase(
                        user,
                        keyword,
                        user,
                        keyword
                );
    }
}
