package QuickNotes_App.service;

import QuickNotes_App.model.Note;
import QuickNotes_App.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Note saveNote(Note note) {
        return noteRepository.save(note);
    }

    public Note updateNote(Long id, Note updatedNote) {

        Note existingNote = noteRepository.findById(id).orElse(null);

        if (existingNote != null) {
            existingNote.setTitle(updatedNote.getTitle());
            existingNote.setContent(updatedNote.getContent());

            return noteRepository.save(existingNote);
        }

        return null;
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}