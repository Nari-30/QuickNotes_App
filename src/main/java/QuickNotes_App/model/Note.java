package QuickNotes_App.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 5000)
    private String content;

    // CREATED TIME
    private LocalDateTime createdAt;

    // UPDATED TIME
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // AUTO CREATE TIME
    @PrePersist
    protected void onCreate() {
    
        createdAt = LocalDateTime.now(
                ZoneId.of("Asia/Kolkata")
        );
    
        updatedAt = LocalDateTime.now(
                ZoneId.of("Asia/Kolkata")
        );
    }

    // AUTO UPDATE TIME
    @PreUpdate
    protected void onUpdate() {
    
        updatedAt = LocalDateTime.now(
                ZoneId.of("Asia/Kolkata")
        );
    }

    public Note() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
