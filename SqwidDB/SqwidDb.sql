/****** Object:  Database [SqwidDB]    Script Date: 4/14/2021 11:17:23 PM ******/
CREATE DATABASE [SqwidDB]  (EDITION = 'Basic', SERVICE_OBJECTIVE = 'Basic', MAXSIZE = 2 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS;
GO
ALTER DATABASE [SqwidDB] SET COMPATIBILITY_LEVEL = 150
GO
ALTER DATABASE [SqwidDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SqwidDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SqwidDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SqwidDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SqwidDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [SqwidDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SqwidDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SqwidDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SqwidDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SqwidDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SqwidDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SqwidDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SqwidDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SqwidDB] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [SqwidDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SqwidDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [SqwidDB] SET  MULTI_USER 
GO
ALTER DATABASE [SqwidDB] SET ENCRYPTION ON
GO
ALTER DATABASE [SqwidDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [SqwidDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 7), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 10, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
/*** The scripts of database scoped configurations in Azure should be executed inside the target database connection. ***/
GO
-- ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 8;
GO
/****** Object:  UserDefinedFunction [dbo].[fn_diagramobjects]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE FUNCTION [dbo].[fn_diagramobjects]() 
	RETURNS int
	WITH EXECUTE AS N'dbo'
	AS
	BEGIN
		declare @id_upgraddiagrams		int
		declare @id_sysdiagrams			int
		declare @id_helpdiagrams		int
		declare @id_helpdiagramdefinition	int
		declare @id_creatediagram	int
		declare @id_renamediagram	int
		declare @id_alterdiagram 	int 
		declare @id_dropdiagram		int
		declare @InstalledObjects	int

		select @InstalledObjects = 0

		select 	@id_upgraddiagrams = object_id(N'dbo.sp_upgraddiagrams'),
			@id_sysdiagrams = object_id(N'dbo.sysdiagrams'),
			@id_helpdiagrams = object_id(N'dbo.sp_helpdiagrams'),
			@id_helpdiagramdefinition = object_id(N'dbo.sp_helpdiagramdefinition'),
			@id_creatediagram = object_id(N'dbo.sp_creatediagram'),
			@id_renamediagram = object_id(N'dbo.sp_renamediagram'),
			@id_alterdiagram = object_id(N'dbo.sp_alterdiagram'), 
			@id_dropdiagram = object_id(N'dbo.sp_dropdiagram')

		if @id_upgraddiagrams is not null
			select @InstalledObjects = @InstalledObjects + 1
		if @id_sysdiagrams is not null
			select @InstalledObjects = @InstalledObjects + 2
		if @id_helpdiagrams is not null
			select @InstalledObjects = @InstalledObjects + 4
		if @id_helpdiagramdefinition is not null
			select @InstalledObjects = @InstalledObjects + 8
		if @id_creatediagram is not null
			select @InstalledObjects = @InstalledObjects + 16
		if @id_renamediagram is not null
			select @InstalledObjects = @InstalledObjects + 32
		if @id_alterdiagram  is not null
			select @InstalledObjects = @InstalledObjects + 64
		if @id_dropdiagram is not null
			select @InstalledObjects = @InstalledObjects + 128
		
		return @InstalledObjects 
	END
	
GO
/****** Object:  Table [dbo].[Comment-Creations]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comment-Creations](
	[Comment-Creations.CommentId] [int] NOT NULL,
	[Comment-Creations.CreationId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[Comment.Text] [nvarchar](max) NULL,
	[Comment.Id] [int] IDENTITY(1,1) NOT NULL,
	[Comment.CreationId] [int] NOT NULL,
	[Comment.UserId] [int] NOT NULL,
 CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED 
(
	[Comment.Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Creations]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Creations](
	[Creation.ImagePath] [nvarchar](max) NULL,
	[Creation.Description] [nvarchar](max) NULL,
	[Creation.Title] [nvarchar](50) NULL,
	[Creation.CreatorId] [int] NULL,
	[Creation.Id] [int] IDENTITY(1,1) NOT NULL,
	[Creation.NumFavorites] [int] NULL,
	[Creation.IsPublic] [bit] NULL,
	[Creation.Rating] [int] NULL,
	[Creation.EventId] [int] NULL,
	[Creation.GroupId] [int] NULL,
	[Creation.CreatorFirstName] [nvarchar](50) NULL,
	[Creation.CreatorLastName] [nvarchar](50) NULL,
 CONSTRAINT [PK_Creations] PRIMARY KEY CLUSTERED 
(
	[Creation.Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Events]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Events](
	[Event.Name] [nvarchar](50) NULL,
	[Event.Description] [nvarchar](max) NULL,
	[Event.Id] [int] IDENTITY(1,1) NOT NULL,
	[Event.GroupId] [int] NOT NULL,
	[Event.Admin] [int] NULL,
	[Event.StartDate] [datetime] NULL,
	[Event.DueDate] [datetime] NULL,
	[Event.PublicVoting] [bit] NULL,
	[Event.Category] [nvarchar](50) NULL,
 CONSTRAINT [PK_Events] PRIMARY KEY CLUSTERED 
(
	[Event.Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Favorites]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Favorites](
	[Favorite.CreationId] [int] NOT NULL,
	[Favorite.UserId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Groups]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Groups](
	[Group.Id] [int] IDENTITY(1,1) NOT NULL,
	[Group.Name] [nvarchar](50) NULL,
	[Group.Description] [nvarchar](max) NULL,
	[Group.AdminId] [int] NULL,
 CONSTRAINT [PK_Groups] PRIMARY KEY CLUSTERED 
(
	[Group.Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ratings]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ratings](
	[Rating.Number] [int] NULL,
	[Rating.UserId] [int] NOT NULL,
	[Rating.CreationId] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[sysdiagrams]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[sysdiagrams](
	[name] [sysname] NOT NULL,
	[principal_id] [int] NOT NULL,
	[diagram_id] [int] IDENTITY(1,1) NOT NULL,
	[version] [int] NULL,
	[definition] [varbinary](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[diagram_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED 
(
	[principal_id] ASC,
	[name] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User-Groups]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User-Groups](
	[User-Group.GroupId] [int] NOT NULL,
	[User-Group.UserId] [int] NOT NULL,
	[UserGroup.Id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_User-Groups] PRIMARY KEY CLUSTERED 
(
	[UserGroup.Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[User.FirstName] [nvarchar](50) NULL,
	[User.LastName] [nvarchar](50) NULL,
	[User.Email] [nvarchar](50) NULL,
	[User.Id] [int] IDENTITY(1,1) NOT NULL,
	[User.UserName] [nvarchar](50) NULL,
	[User.Password] [nvarchar](50) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[User.Id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Comment-Creations]  WITH CHECK ADD  CONSTRAINT [FK_Comment-Creations_Comments] FOREIGN KEY([Comment-Creations.CommentId])
REFERENCES [dbo].[Comments] ([Comment.Id])
GO
ALTER TABLE [dbo].[Comment-Creations] CHECK CONSTRAINT [FK_Comment-Creations_Comments]
GO
ALTER TABLE [dbo].[Comment-Creations]  WITH CHECK ADD  CONSTRAINT [FK_Comment-Creations_Creations] FOREIGN KEY([Comment-Creations.CreationId])
REFERENCES [dbo].[Creations] ([Creation.Id])
GO
ALTER TABLE [dbo].[Comment-Creations] CHECK CONSTRAINT [FK_Comment-Creations_Creations]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Creations] FOREIGN KEY([Comment.CreationId])
REFERENCES [dbo].[Creations] ([Creation.Id])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Creations]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Users] FOREIGN KEY([Comment.UserId])
REFERENCES [dbo].[Users] ([User.Id])
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Users]
GO
ALTER TABLE [dbo].[Creations]  WITH CHECK ADD  CONSTRAINT [FK_Creations_Events] FOREIGN KEY([Creation.EventId])
REFERENCES [dbo].[Events] ([Event.Id])
GO
ALTER TABLE [dbo].[Creations] CHECK CONSTRAINT [FK_Creations_Events]
GO
ALTER TABLE [dbo].[Creations]  WITH CHECK ADD  CONSTRAINT [FK_Creations_Groups] FOREIGN KEY([Creation.GroupId])
REFERENCES [dbo].[Groups] ([Group.Id])
GO
ALTER TABLE [dbo].[Creations] CHECK CONSTRAINT [FK_Creations_Groups]
GO
ALTER TABLE [dbo].[Creations]  WITH CHECK ADD  CONSTRAINT [FK_Creations_Users] FOREIGN KEY([Creation.CreatorId])
REFERENCES [dbo].[Users] ([User.Id])
GO
ALTER TABLE [dbo].[Creations] CHECK CONSTRAINT [FK_Creations_Users]
GO
ALTER TABLE [dbo].[Events]  WITH CHECK ADD  CONSTRAINT [FK_Events_Groups] FOREIGN KEY([Event.GroupId])
REFERENCES [dbo].[Groups] ([Group.Id])
GO
ALTER TABLE [dbo].[Events] CHECK CONSTRAINT [FK_Events_Groups]
GO
ALTER TABLE [dbo].[Events]  WITH CHECK ADD  CONSTRAINT [FK_Events_Users] FOREIGN KEY([Event.Admin])
REFERENCES [dbo].[Users] ([User.Id])
GO
ALTER TABLE [dbo].[Events] CHECK CONSTRAINT [FK_Events_Users]
GO
ALTER TABLE [dbo].[Favorites]  WITH CHECK ADD  CONSTRAINT [FK_Favorites_Creations] FOREIGN KEY([Favorite.CreationId])
REFERENCES [dbo].[Creations] ([Creation.Id])
GO
ALTER TABLE [dbo].[Favorites] CHECK CONSTRAINT [FK_Favorites_Creations]
GO
ALTER TABLE [dbo].[Favorites]  WITH CHECK ADD  CONSTRAINT [FK_Favorites_Users] FOREIGN KEY([Favorite.UserId])
REFERENCES [dbo].[Users] ([User.Id])
GO
ALTER TABLE [dbo].[Favorites] CHECK CONSTRAINT [FK_Favorites_Users]
GO
ALTER TABLE [dbo].[Groups]  WITH CHECK ADD  CONSTRAINT [FK_Groups_Users] FOREIGN KEY([Group.AdminId])
REFERENCES [dbo].[Users] ([User.Id])
GO
ALTER TABLE [dbo].[Groups] CHECK CONSTRAINT [FK_Groups_Users]
GO
ALTER TABLE [dbo].[Ratings]  WITH CHECK ADD  CONSTRAINT [FK_Ratings_Creations] FOREIGN KEY([Rating.CreationId])
REFERENCES [dbo].[Creations] ([Creation.Id])
GO
ALTER TABLE [dbo].[Ratings] CHECK CONSTRAINT [FK_Ratings_Creations]
GO
ALTER TABLE [dbo].[Ratings]  WITH CHECK ADD  CONSTRAINT [FK_Ratings_Users] FOREIGN KEY([Rating.UserId])
REFERENCES [dbo].[Users] ([User.Id])
GO
ALTER TABLE [dbo].[Ratings] CHECK CONSTRAINT [FK_Ratings_Users]
GO
ALTER TABLE [dbo].[User-Groups]  WITH CHECK ADD  CONSTRAINT [FK_User-Groups_Groups] FOREIGN KEY([User-Group.GroupId])
REFERENCES [dbo].[Groups] ([Group.Id])
GO
ALTER TABLE [dbo].[User-Groups] CHECK CONSTRAINT [FK_User-Groups_Groups]
GO
ALTER TABLE [dbo].[User-Groups]  WITH CHECK ADD  CONSTRAINT [FK_User-Groups_Users] FOREIGN KEY([User-Group.UserId])
REFERENCES [dbo].[Users] ([User.Id])
GO
ALTER TABLE [dbo].[User-Groups] CHECK CONSTRAINT [FK_User-Groups_Users]
GO
/****** Object:  StoredProcedure [dbo].[sp_alterdiagram]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROCEDURE [dbo].[sp_alterdiagram]
	(
		@diagramname 	sysname,
		@owner_id	int	= null,
		@version 	int,
		@definition 	varbinary(max)
	)
	WITH EXECUTE AS 'dbo'
	AS
	BEGIN
		set nocount on
	
		declare @theId 			int
		declare @retval 		int
		declare @IsDbo 			int
		
		declare @UIDFound 		int
		declare @DiagId			int
		declare @ShouldChangeUID	int
	
		if(@diagramname is null)
		begin
			RAISERROR ('Invalid ARG', 16, 1)
			return -1
		end
	
		execute as caller;
		select @theId = DATABASE_PRINCIPAL_ID();	 
		select @IsDbo = IS_MEMBER(N'db_owner'); 
		if(@owner_id is null)
			select @owner_id = @theId;
		revert;
	
		select @ShouldChangeUID = 0
		select @DiagId = diagram_id, @UIDFound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname 
		
		if(@DiagId IS NULL or (@IsDbo = 0 and @theId <> @UIDFound))
		begin
			RAISERROR ('Diagram does not exist or you do not have permission.', 16, 1);
			return -3
		end
	
		if(@IsDbo <> 0)
		begin
			if(@UIDFound is null or USER_NAME(@UIDFound) is null) -- invalid principal_id
			begin
				select @ShouldChangeUID = 1 ;
			end
		end

		-- update dds data			
		update dbo.sysdiagrams set definition = @definition where diagram_id = @DiagId ;

		-- change owner
		if(@ShouldChangeUID = 1)
			update dbo.sysdiagrams set principal_id = @theId where diagram_id = @DiagId ;

		-- update dds version
		if(@version is not null)
			update dbo.sysdiagrams set version = @version where diagram_id = @DiagId ;

		return 0
	END
	
GO
/****** Object:  StoredProcedure [dbo].[sp_creatediagram]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROCEDURE [dbo].[sp_creatediagram]
	(
		@diagramname 	sysname,
		@owner_id		int	= null, 	
		@version 		int,
		@definition 	varbinary(max)
	)
	WITH EXECUTE AS 'dbo'
	AS
	BEGIN
		set nocount on
	
		declare @theId int
		declare @retval int
		declare @IsDbo	int
		declare @userName sysname
		if(@version is null or @diagramname is null)
		begin
			RAISERROR (N'E_INVALIDARG', 16, 1);
			return -1
		end
	
		execute as caller;
		select @theId = DATABASE_PRINCIPAL_ID(); 
		select @IsDbo = IS_MEMBER(N'db_owner');
		revert; 
		
		if @owner_id is null
		begin
			select @owner_id = @theId;
		end
		else
		begin
			if @theId <> @owner_id
			begin
				if @IsDbo = 0
				begin
					RAISERROR (N'E_INVALIDARG', 16, 1);
					return -1
				end
				select @theId = @owner_id
			end
		end
		-- next 2 line only for test, will be removed after define name unique
		if EXISTS(select diagram_id from dbo.sysdiagrams where principal_id = @theId and name = @diagramname)
		begin
			RAISERROR ('The name is already used.', 16, 1);
			return -2
		end
	
		insert into dbo.sysdiagrams(name, principal_id , version, definition)
				VALUES(@diagramname, @theId, @version, @definition) ;
		
		select @retval = @@IDENTITY 
		return @retval
	END
	
GO
/****** Object:  StoredProcedure [dbo].[sp_dropdiagram]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROCEDURE [dbo].[sp_dropdiagram]
	(
		@diagramname 	sysname,
		@owner_id	int	= null
	)
	WITH EXECUTE AS 'dbo'
	AS
	BEGIN
		set nocount on
		declare @theId 			int
		declare @IsDbo 			int
		
		declare @UIDFound 		int
		declare @DiagId			int
	
		if(@diagramname is null)
		begin
			RAISERROR ('Invalid value', 16, 1);
			return -1
		end
	
		EXECUTE AS CALLER;
		select @theId = DATABASE_PRINCIPAL_ID();
		select @IsDbo = IS_MEMBER(N'db_owner'); 
		if(@owner_id is null)
			select @owner_id = @theId;
		REVERT; 
		
		select @DiagId = diagram_id, @UIDFound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname 
		if(@DiagId IS NULL or (@IsDbo = 0 and @UIDFound <> @theId))
		begin
			RAISERROR ('Diagram does not exist or you do not have permission.', 16, 1)
			return -3
		end
	
		delete from dbo.sysdiagrams where diagram_id = @DiagId;
	
		return 0;
	END
	
GO
/****** Object:  StoredProcedure [dbo].[sp_helpdiagramdefinition]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROCEDURE [dbo].[sp_helpdiagramdefinition]
	(
		@diagramname 	sysname,
		@owner_id	int	= null 		
	)
	WITH EXECUTE AS N'dbo'
	AS
	BEGIN
		set nocount on

		declare @theId 		int
		declare @IsDbo 		int
		declare @DiagId		int
		declare @UIDFound	int
	
		if(@diagramname is null)
		begin
			RAISERROR (N'E_INVALIDARG', 16, 1);
			return -1
		end
	
		execute as caller;
		select @theId = DATABASE_PRINCIPAL_ID();
		select @IsDbo = IS_MEMBER(N'db_owner');
		if(@owner_id is null)
			select @owner_id = @theId;
		revert; 
	
		select @DiagId = diagram_id, @UIDFound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname;
		if(@DiagId IS NULL or (@IsDbo = 0 and @UIDFound <> @theId ))
		begin
			RAISERROR ('Diagram does not exist or you do not have permission.', 16, 1);
			return -3
		end

		select version, definition FROM dbo.sysdiagrams where diagram_id = @DiagId ; 
		return 0
	END
	
GO
/****** Object:  StoredProcedure [dbo].[sp_helpdiagrams]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROCEDURE [dbo].[sp_helpdiagrams]
	(
		@diagramname sysname = NULL,
		@owner_id int = NULL
	)
	WITH EXECUTE AS N'dbo'
	AS
	BEGIN
		DECLARE @user sysname
		DECLARE @dboLogin bit
		EXECUTE AS CALLER;
			SET @user = USER_NAME();
			SET @dboLogin = CONVERT(bit,IS_MEMBER('db_owner'));
		REVERT;
		SELECT
			[Database] = DB_NAME(),
			[Name] = name,
			[ID] = diagram_id,
			[Owner] = USER_NAME(principal_id),
			[OwnerID] = principal_id
		FROM
			sysdiagrams
		WHERE
			(@dboLogin = 1 OR USER_NAME(principal_id) = @user) AND
			(@diagramname IS NULL OR name = @diagramname) AND
			(@owner_id IS NULL OR principal_id = @owner_id)
		ORDER BY
			4, 5, 1
	END
	
GO
/****** Object:  StoredProcedure [dbo].[sp_renamediagram]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROCEDURE [dbo].[sp_renamediagram]
	(
		@diagramname 		sysname,
		@owner_id		int	= null,
		@new_diagramname	sysname
	
	)
	WITH EXECUTE AS 'dbo'
	AS
	BEGIN
		set nocount on
		declare @theId 			int
		declare @IsDbo 			int
		
		declare @UIDFound 		int
		declare @DiagId			int
		declare @DiagIdTarg		int
		declare @u_name			sysname
		if((@diagramname is null) or (@new_diagramname is null))
		begin
			RAISERROR ('Invalid value', 16, 1);
			return -1
		end
	
		EXECUTE AS CALLER;
		select @theId = DATABASE_PRINCIPAL_ID();
		select @IsDbo = IS_MEMBER(N'db_owner'); 
		if(@owner_id is null)
			select @owner_id = @theId;
		REVERT;
	
		select @u_name = USER_NAME(@owner_id)
	
		select @DiagId = diagram_id, @UIDFound = principal_id from dbo.sysdiagrams where principal_id = @owner_id and name = @diagramname 
		if(@DiagId IS NULL or (@IsDbo = 0 and @UIDFound <> @theId))
		begin
			RAISERROR ('Diagram does not exist or you do not have permission.', 16, 1)
			return -3
		end
	
		-- if((@u_name is not null) and (@new_diagramname = @diagramname))	-- nothing will change
		--	return 0;
	
		if(@u_name is null)
			select @DiagIdTarg = diagram_id from dbo.sysdiagrams where principal_id = @theId and name = @new_diagramname
		else
			select @DiagIdTarg = diagram_id from dbo.sysdiagrams where principal_id = @owner_id and name = @new_diagramname
	
		if((@DiagIdTarg is not null) and  @DiagId <> @DiagIdTarg)
		begin
			RAISERROR ('The name is already used.', 16, 1);
			return -2
		end		
	
		if(@u_name is null)
			update dbo.sysdiagrams set [name] = @new_diagramname, principal_id = @theId where diagram_id = @DiagId
		else
			update dbo.sysdiagrams set [name] = @new_diagramname where diagram_id = @DiagId
		return 0
	END
	
GO
/****** Object:  StoredProcedure [dbo].[sp_upgraddiagrams]    Script Date: 4/14/2021 11:17:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROCEDURE [dbo].[sp_upgraddiagrams]
	AS
	BEGIN
		IF OBJECT_ID(N'dbo.sysdiagrams') IS NOT NULL
			return 0;
	
		CREATE TABLE dbo.sysdiagrams
		(
			name sysname NOT NULL,
			principal_id int NOT NULL,	-- we may change it to varbinary(85)
			diagram_id int PRIMARY KEY IDENTITY,
			version int,
	
			definition varbinary(max)
			CONSTRAINT UK_principal_name UNIQUE
			(
				principal_id,
				name
			)
		);


		/* Add this if we need to have some form of extended properties for diagrams */
		/*
		IF OBJECT_ID(N'dbo.sysdiagram_properties') IS NULL
		BEGIN
			CREATE TABLE dbo.sysdiagram_properties
			(
				diagram_id int,
				name sysname,
				value varbinary(max) NOT NULL
			)
		END
		*/

		IF OBJECT_ID(N'dbo.dtproperties') IS NOT NULL
		begin
			insert into dbo.sysdiagrams
			(
				[name],
				[principal_id],
				[version],
				[definition]
			)
			select	 
				convert(sysname, dgnm.[uvalue]),
				DATABASE_PRINCIPAL_ID(N'dbo'),			-- will change to the sid of sa
				0,							-- zero for old format, dgdef.[version],
				dgdef.[lvalue]
			from dbo.[dtproperties] dgnm
				inner join dbo.[dtproperties] dggd on dggd.[property] = 'DtgSchemaGUID' and dggd.[objectid] = dgnm.[objectid]	
				inner join dbo.[dtproperties] dgdef on dgdef.[property] = 'DtgSchemaDATA' and dgdef.[objectid] = dgnm.[objectid]
				
			where dgnm.[property] = 'DtgSchemaNAME' and dggd.[uvalue] like N'_EA3E6268-D998-11CE-9454-00AA00A3F36E_' 
			return 2;
		end
		return 1;
	END
	
GO
EXEC sys.sp_addextendedproperty @name=N'microsoft_database_tools_support', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'sysdiagrams'
GO
ALTER DATABASE [SqwidDB] SET  READ_WRITE 
GO
