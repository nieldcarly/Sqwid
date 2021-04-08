using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Sqwid
{
    public partial class SqwidDBContext : DbContext
    {
        public SqwidDBContext()
        {
        }

        public SqwidDBContext(DbContextOptions<SqwidDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<CommentCreation> CommentCreations { get; set; }
        public virtual DbSet<Creation> Creations { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Favorite> Favorites { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<Rating> Ratings { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserGroup> UserGroups { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=tcp:sqwid.database.windows.net,1433;Initial Catalog=SqwidDB;Persist Security Info=False;User ID=nieldca;Password=a0youknOdakine!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.Property(e => e.CommentId).HasColumnName("Comment.Id");

                entity.Property(e => e.CommentCreationId).HasColumnName("Comment.CreationId");

                entity.Property(e => e.CommentText).HasColumnName("Comment.Text");

                entity.Property(e => e.CommentUserId).HasColumnName("Comment.UserId");

                entity.HasOne(d => d.CommentCreation)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.CommentCreationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comments_Creations");

                entity.HasOne(d => d.CommentUser)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.CommentUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comments_Users");
            });

            modelBuilder.Entity<CommentCreation>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("Comment-Creations");

                entity.Property(e => e.CommentCreationsCommentId).HasColumnName("Comment-Creations.CommentId");

                entity.Property(e => e.CommentCreationsCreationId).HasColumnName("Comment-Creations.CreationId");

                entity.HasOne(d => d.CommentCreationsComment)
                    .WithMany()
                    .HasForeignKey(d => d.CommentCreationsCommentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment-Creations_Comments");

                entity.HasOne(d => d.CommentCreationsCreation)
                    .WithMany()
                    .HasForeignKey(d => d.CommentCreationsCreationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment-Creations_Creations");
            });

            modelBuilder.Entity<Creation>(entity =>
            {
                entity.Property(e => e.CreationId)
                    .ValueGeneratedNever()
                    .HasColumnName("Creation.Id");

                entity.Property(e => e.CreationCreatorId).HasColumnName("Creation.CreatorId");

                entity.Property(e => e.CreationDescription).HasColumnName("Creation.Description");

                entity.Property(e => e.CreationImagePath).HasColumnName("Creation.ImagePath");

                entity.Property(e => e.CreationIsPublic).HasColumnName("Creation.IsPublic");

                entity.Property(e => e.CreationNumFavorites).HasColumnName("Creation.NumFavorites");

                entity.Property(e => e.CreationRating).HasColumnName("Creation.Rating");

                entity.Property(e => e.CreationTitle)
                    .HasMaxLength(50)
                    .HasColumnName("Creation.Title");

                entity.HasOne(d => d.CreationCreator)
                    .WithMany(p => p.Creations)
                    .HasForeignKey(d => d.CreationCreatorId)
                    .HasConstraintName("FK_Creations_Users");
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.Property(e => e.EventId).HasColumnName("Event.Id");

                entity.Property(e => e.EventAdmin).HasColumnName("Event.Admin");

                entity.Property(e => e.EventCategory)
                    .HasMaxLength(50)
                    .HasColumnName("Event.Category");

                entity.Property(e => e.EventDescription).HasColumnName("Event.Description");

                entity.Property(e => e.EventDueDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Event.DueDate");

                entity.Property(e => e.EventGroupId).HasColumnName("Event.GroupId");

                entity.Property(e => e.EventName)
                    .HasMaxLength(50)
                    .HasColumnName("Event.Name");

                entity.Property(e => e.EventPublicVoting).HasColumnName("Event.PublicVoting");

                entity.Property(e => e.EventStartDate)
                    .HasColumnType("datetime")
                    .HasColumnName("Event.StartDate");

                entity.HasOne(d => d.EventAdminNavigation)
                    .WithMany(p => p.Events)
                    .HasForeignKey(d => d.EventAdmin)
                    .HasConstraintName("FK_Events_Users");

                entity.HasOne(d => d.EventGroup)
                    .WithMany(p => p.Events)
                    .HasForeignKey(d => d.EventGroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Events_Groups");
            });

            modelBuilder.Entity<Favorite>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.FavoriteCreationId).HasColumnName("Favorite.CreationId");

                entity.Property(e => e.FavoriteUserId).HasColumnName("Favorite.UserId");

                entity.HasOne(d => d.FavoriteCreation)
                    .WithMany()
                    .HasForeignKey(d => d.FavoriteCreationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Favorites_Creations");

                entity.HasOne(d => d.FavoriteUser)
                    .WithMany()
                    .HasForeignKey(d => d.FavoriteUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Favorites_Users");
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.Property(e => e.GroupId)
                    .ValueGeneratedNever()
                    .HasColumnName("Group.Id");

                entity.Property(e => e.GroupAdminId).HasColumnName("Group.AdminId");

                entity.Property(e => e.GroupDescription).HasColumnName("Group.Description");

                entity.Property(e => e.GroupName)
                    .HasMaxLength(50)
                    .HasColumnName("Group.Name");

                entity.HasOne(d => d.GroupAdmin)
                    .WithMany(p => p.Groups)
                    .HasForeignKey(d => d.GroupAdminId)
                    .HasConstraintName("FK_Groups_Users");
            });

            modelBuilder.Entity<Rating>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.RatingCreationId).HasColumnName("Rating.CreationId");

                entity.Property(e => e.RatingNumber).HasColumnName("Rating.Number");

                entity.Property(e => e.RatingUserId).HasColumnName("Rating.UserId");

                entity.HasOne(d => d.RatingCreation)
                    .WithMany()
                    .HasForeignKey(d => d.RatingCreationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ratings_Creations");

                entity.HasOne(d => d.RatingUser)
                    .WithMany()
                    .HasForeignKey(d => d.RatingUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Ratings_Users");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).HasColumnName("User.Id");

                entity.Property(e => e.UserEmail)
                    .HasMaxLength(50)
                    .HasColumnName("User.Email");

                entity.Property(e => e.UserFirstName)
                    .HasMaxLength(50)
                    .HasColumnName("User.FirstName");

                entity.Property(e => e.UserLastName)
                    .HasMaxLength(50)
                    .HasColumnName("User.LastName");

                entity.Property(e => e.UserPassword)
                    .HasMaxLength(50)
                    .HasColumnName("User.Password");

                entity.Property(e => e.UserUserName)
                    .HasMaxLength(50)
                    .HasColumnName("User.UserName");
            });

            modelBuilder.Entity<UserGroup>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("User-Groups");

                entity.Property(e => e.UserGroupGroupId).HasColumnName("User-Group.GroupId");

                entity.Property(e => e.UserGroupUserId).HasColumnName("User-Group.UserId");

                entity.HasOne(d => d.UserGroupGroup)
                    .WithMany()
                    .HasForeignKey(d => d.UserGroupGroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User-Groups_Groups");

                entity.HasOne(d => d.UserGroupUser)
                    .WithMany()
                    .HasForeignKey(d => d.UserGroupUserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User-Groups_Users");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
