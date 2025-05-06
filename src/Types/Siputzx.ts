/**
 * Generic API response structure for various media and news APIs.
 * @interface
 */
export interface IAI {
  /** Indicates whether the API request was successful. */
  status: boolean;
  /** The primary data payload returned by the API. */
  data: string;
  /** Error message describing the failure, if applicable. */
  error?: string;
}

/**
 * Detailed metadata for an anime from the Anichin API.
 * @interface
 */
export interface IAnichinDetail {
  /** The primary title of the anime. */
  title: string;
  /** URL to the anime's thumbnail image. */
  thumbnail: string;
  /** Rating score of the anime (e.g., "8.5/10"). */
  rating: string;
  /** Number of followers or subscribers to the anime. */
  followers: string;
  /** Brief summary or description of the anime's plot. */
  synopsis: string;
  /** Alternative titles used for the anime. */
  alternativeTitles: string;
  /** Current airing status (e.g., "Ongoing", "Completed"). */
  status: string;
  /** Network or platform broadcasting the anime. */
  network: string;
  /** Studio responsible for producing the anime. */
  studio: string;
  /** Release date or year of the anime. */
  released: string;
  /** Duration of each episode (e.g., "24 min"). */
  duration: string;
  /** Season of release (e.g., "Spring 2023"). */
  season: string;
  /** Country where the anime was produced. */
  country: string;
  /** Type of anime (e.g., "Donghua", "Movie"). */
  type: string;
  /** Total number of episodes. */
  episodes: string;
  /** List of genres associated with the anime (e.g., ["Action", "Fantasy"]). */
  genres: string[];
  /** Indicates whether the request was successful. */
  isSuccess: boolean;
}

/**
 * Download links for an anime episode from the Anichin API.
 * @interface
 */
export interface IAnichinDownload {
  /** Indicates whether the download link request was successful. */
  status: boolean;
  /** Array of download options, each with resolution and hosting links. */
  data: {
    /** Video resolution (e.g., "720p", "1080p"). */
    resolution: string;
    /** Array of download links with hosting service details. */
    links: {
      /** Name of the hosting service (e.g., "Mega", "Google Drive"). */
      host: string;
      /** URL to download the episode. */
      link: string;
    }[];
  }[];
}

/**
 * List of episodes for an anime from the Anichin API.
 * @interface
 */
export interface IAnichinEpisode {
  /** Indicates whether the episode list request was successful. */
  status: boolean;
  /** Array of episode details. */
  data: {
    /** Episode number (e.g., "Episode 1"). */
    episodeNumber: string;
    /** Title of the episode. */
    title: string;
    /** Subtitle status (e.g., "Subbed", "Dubbed"). */
    subStatus: string;
    /** Release date of the episode (e.g., "2023-10-01"). */
    releaseDate: string;
    /** URL to the episode's page or stream. */
    link: string;
  }[];
}

/**
 * Latest anime releases from the Anichin API.
 * @interface
 */
export interface IAnichinLatest {
  /** Indicates whether the latest anime request was successful. */
  status: boolean;
  /** Array of recently released anime. */
  data: {
    /** Title of the anime. */
    title: string;
    /** URL to the anime's page. */
    url: string;
    /** Latest episode number (e.g., "Episode 12"). */
    episode: string;
    /** URL to the anime's thumbnail image. */
    thumbnail: string;
    /** Type of anime (e.g., "Donghua", "Movie"). */
    type: Type;
  }[];
}

/**
 * Popular anime from the Anichin API.
 * @interface
 */
export interface IAnichinPopular {
  /** Indicates whether the popular anime request was successful. */
  status: boolean;
  /** Array of trending or highly rated anime. */
  data: {
    /** Title of the anime. */
    title: string;
    /** Latest episode number (e.g., "Episode 5"). */
    episode: string;
    /** Type of anime (e.g., "Donghua", "Movie"). */
    type: Type;
    /** URL to the anime's page. */
    link: string;
    /** URL to the anime's image. */
    image: string;
  }[];
}

/**
 * Search results for anime from the Anichin API.
 * @interface
 */
export interface IAnichinSearch {
  /** Indicates whether the search request was successful. */
  status: boolean;
  /** Array of anime matching the search query. */
  data: {
    /** Title of the anime. */
    title: string;
    /** Type of anime (e.g., "Donghua", "Movie"). */
    type: Type;
    /** Current airing status (e.g., "Ongoing", "Completed"). */
    status: Status;
    /** URL to the anime's page. */
    link: string;
    /** URL to the anime's image. */
    image: string;
  }[];
}

/**
 * Detailed metadata for an anime from the Auratail API.
 * @interface
 */
export interface IAuratailDetail {
  /** Indicates whether the detail request was successful. */
  status: boolean;
  /** Detailed information about the anime. */
  data: {
    /** Title of the anime. */
    title: string;
    /** URL to the anime's image. */
    image: string;
    /** Current airing status (e.g., "Ongoing", "Completed"). */
    status: string;
    /** Studio responsible for producing the anime. */
    studio: string;
    /** Total number of episodes. */
    episodes: string;
    /** Duration of each episode (e.g., "24 min"). */
    duration: string;
    /** Type of anime (e.g., "Donghua", "Movie"). */
    type: string;
    /** Release year of the anime (e.g., "2023"). */
    releaseYear: string;
    /** Producers involved in the anime. */
    producers: string;
    /** Genres associated with the anime (e.g., "Action, Fantasy"). */
    genres: string;
    /** Summary or description of the anime's plot. */
    synopsis: string;
  };
}

/**
 * Latest anime releases from the Auratail API.
 * @interface
 */
export interface IAuratailLatest {
  /** Indicates whether the latest anime request was successful. */
  status: boolean;
  /** Array of recently released anime. */
  data: {
    /** Title of the anime. */
    title: string;
    /** URL to the anime's page. */
    url: string;
    /** Latest episode number (e.g., "Episode 10"). */
    episode: string;
    /** URL to the anime's thumbnail image. */
    thumbnail: string;
    /** Type of anime (e.g., "Donghua", "Movie"). */
    type: string;
  }[];
}

/**
 * Popular anime from the Auratail API.
 * @interface
 */
export interface IAuratailPopular {
  /** Indicates whether the popular anime request was successful. */
  status: boolean;
  /** Array of trending or highly rated anime. */
  data: {
    /** Title of the anime. */
    title: string;
    /** URL to the anime's page. */
    link: string;
  }[];
}

/**
 * Search results for anime from the Auratail API.
 * @interface
 */
export interface IAuratailSearch {
  /** Indicates whether the search request was successful. */
  status: boolean;
  /** Array of anime matching the search query. */
  data: {
    /** Title of the anime. */
    title: string;
    /** URL to the anime's page. */
    link: string;
    /** Current airing status (e.g., "Ongoing", "Completed"). */
    status: Status;
  }[];
}

/**
 * Search results for manga from the Kiryuu API.
 * @interface
 */
export interface IKiryuuSearch {
  /** Indicates whether the search request was successful. */
  status: boolean;
  /** Array of manga matching the search query. */
  data: {
    /** Primary title of the manga. */
    title: string;
    /** Alternative title of the manga. */
    altTitle: string;
    /** Summary or description of the manga's plot. */
    description: string;
    /** URL to the manga's cover image. */
    image: string;
    /** Rating score of the manga (e.g., "4.5/5"). */
    rating: string;
    /** Current publication status (e.g., "Ongoing", "Completed"). */
    status: string;
    /** Release year or date of the manga. */
    released: string;
    /** Author of the manga. */
    author: string;
    /** Artist of the manga. */
    artist: string;
    /** User or entity that uploaded the manga. */
    postedBy: string;
    /** Number of views the manga has received. */
    views: string;
    /** Genres associated with the manga (e.g., "Action, Romance"). */
    genres: string;
    /** URL to download the manga, if available. */
    downloadLink?: string;
  }[];
}

/**
 * Detailed metadata for a manga from the Komikindo API.
 * @interface
 */
export interface IKomikindoDetail {
  /** Indicates whether the detail request was successful. */
  status: boolean;
  /** Detailed information about the manga. */
  data: {
    /** Primary title of the manga. */
    title: string;
    /** Alternative title of the manga. */
    altTitle: string;
    /** Current publication status (e.g., "Ongoing", "Completed"). */
    status: string;
    /** Author of the manga. */
    author: string;
    /** Array of genres associated with the manga. */
    genre: string[];
    /** Summary or description of the manga's plot. */
    description: string;
    /** URL to the manga's cover image. */
    imageUrl: string;
    /** Array of chapters with their titles and URLs. */
    chapters: { chapter: string; url: string }[];
  };
}

/**
 * Download links for a manga from the Komikindo API.
 * @interface
 */
export interface IKomikindoDownload {
  /** Indicates whether the download request was successful. */
  status: boolean;
  /** Array of URLs to download the manga chapters. */
  data: string[];
}

/**
 * Search results for manga from the Komikindo API.
 * @interface
 */
export interface IKomikindoSearch {
  /** Indicates whether the search request was successful. */
  status: boolean;
  /** Array of manga matching the search query. */
  data: {
    /** Title of the manga. */
    title: string;
    /** URL to the manga's page. */
    href: string;
    /** URL to the manga's cover image. */
    image: string;
    /** Type of manga (e.g., "Manga", "Manhwa"). */
    type: string;
    /** Rating score of the manga (e.g., "4.8/5"). */
    rating: string;
  }[];
}

/**
 * Anime release schedule from the Samehadaku API.
 * @interface
 */
export interface ISamehadakuRelease {
  /** Indicates whether the release schedule request was successful. */
  status: boolean;
  /** Object mapping release dates to arrays of anime release details. */
  data: Record<
    string,
    {
      /** Unique identifier for the release. */
      id: number;
      /** Slug for the release (e.g., URL-friendly title). */
      slug: string;
      /** Release date (e.g., "2023-10-01"). */
      date: string;
      /** Author or uploader of the release. */
      author: string;
      /** Type of content (e.g., "Anime"). */
      type: string;
      /** Title of the anime. */
      title: string;
      /** URL to the release page. */
      url: string;
      /** Summary or description of the release. */
      content: string;
      /** URL to the featured image, if available. */
      featured_img_src?: string;
      /** Genres of the anime (e.g., "Action, Fantasy"). */
      genre: string;
      /** Rating score of the anime. */
      east_score: string;
      /** Type of release (e.g., "TV", "Movie"). */
      east_type: string;
      /** Schedule of the release (e.g., "Weekly"). */
      east_schedule: string;
      /** Time of the release (e.g., "10:00 AM"). */
      east_time: string;
    }[]
  >;
}

/**
 * Latest anime releases from the Samehadaku API.
 * @interface
 */
export interface ISamehadakuLatest {
  /** Indicates whether the latest anime request was successful. */
  status: boolean;
  /** Details of the latest anime releases. */
  data: {
    /** Total number of anime releases. */
    total: number;
    /** Array of anime release details. */
    anime: {
      /** Title of the anime. */
      title: string;
      /** URL to the anime's thumbnail image. */
      thumbnail: string;
      /** User or entity that uploaded the anime. */
      postedBy: string;
      /** Latest episode number (e.g., "Episode 3"). */
      episode: string;
      /** Release date or time (e.g., "2023-10-02"). */
      release: string;
      /** URL to the anime's page. */
      link: string;
    }[];
  };
}

/**
 * Search results for anime from the Samehadaku API.
 * @interface
 */
export interface ISamehadakuSearch {
  /** Indicates whether the search request was successful. */
  status: boolean;
  /** Array of anime matching the search query. */
  data: {
    /** Title of the anime. */
    title: string;
    /** Unique identifier for the anime. */
    id: string;
    /** URL to the anime's thumbnail image. */
    thumbnail: string;
    /** Summary or description of the anime's plot. */
    description: string;
    /** Array of genres (e.g., ["Action", "Adventure"]). */
    genre: string[];
    /** Array of types (e.g., ["TV", "OVA"]). */
    type: string[];
    /** Rating score of the anime (e.g., "8.2/10"). */
    star: string;
    /** Number of views the anime has received. */
    views: string;
    /** URL to the anime's page. */
    link: string;
  }[];
}

/**
 * Collection of anime quotes.
 * @interface
 */
export interface IQuotes {
  /** Indicates whether the quotes request was successful. */
  status: boolean;
  /** Array of anime quote details. */
  data: {
    /** URL to the quote's page. */
    link: string;
    /** URL to the character's image. */
    gambar: string;
    /** Name of the character who said the quote. */
    karakter: string;
    /** Title of the anime the quote is from. */
    anime: string;
    /** Episode number or identifier for the quote. */
    episode: string;
    /** Date or time the quote was uploaded. */
    up_at: string;
    /** Text of the quote. */
    quotes: string;
  }[];
}

/**
 * APK information from the AN1 API.
 * @interface
 */
export interface IApkAn1 {
  /** Indicates whether the APK request was successful. */
  status: boolean;
  /** Array of APK details. */
  data: {
    /** Title of the APK. */
    title: string;
    /** URL to the APK's page. */
    link: string;
    /** Developer of the APK. */
    developer: string;
    /** URL to the APK's image. */
    image: string;
    /** Rating details for the APK. */
    rating: {
      /** Numerical rating value (e.g., 4.5). */
      value: number;
      /** Percentage of positive ratings (e.g., 90). */
      percentage: number;
    };
    /** Type of APK (e.g., "Mod", "Original"). */
    type: TypeAn1;
  }[];
}

/**
 * APK information from the Appstore API.
 * @interface
 */
export interface IApkAppstore {
  /** Indicates whether the APK request was successful. */
  status: boolean;
  /** Array of APK details. */
  data: {
    /** URL to the APK's image. */
    imageURL: string;
    /** Title of the APK. */
    title: string;
    /** Navigation links related to the APK. */
    navLinks: {
      /** URL of the navigation link. */
      link: string;
      /** Label or name of the link. */
      label: string;
    }[];
    /** Description of the APK. */
    description: string;
  }[];
}

/**
 * APK information from the Happymod API.
 * @interface
 */
export interface IApkHappymod {
  /** Indicates whether the APK request was successful. */
  status: boolean;
  /** Details of the APK. */
  data: {
    /** Title of the APK. */
    title: string;
    /** URL to the APK's page. */
    link: string;
    /** URL to the APK's image. */
    image: string;
    /** Version of the APK (e.g., "1.2.3"). */
    version: string;
    /** Features of the modded APK (e.g., "Unlimited Coins"). */
    modFeatures: string;
    /** Rating details for the APK. */
    rating: { value: number; percentage: number };
  };
}

/**
 * News articles from the Antara API.
 * @interface
 */
export interface INewsAntara {
  /** Indicates whether the news request was successful. */
  status: boolean;
  /** Array of news articles. */
  data: {
    /** Title of the article. */
    title: string;
    /** URL to the article's page. */
    link: string;
    /** URL to the article's image. */
    image: string;
    /** Category of the article (e.g., "Politics"). */
    category: string;
    /** Type of article (e.g., "News"). */
    type: string;
  }[];
}

/**
 * News articles from the CNBC Indonesia API.
 * @interface
 */
export interface INewsCnbcIND {
  /** Indicates whether the news request was successful. */
  status: boolean;
  /** Array of news articles. */
  data: {
    /** Title of the article. */
    title: string;
    /** URL to the article's page. */
    link: string;
    /** URL to the article's image. */
    image: string;
    /** Category of the article (e.g., "Business"). */
    category: string;
    /** Label or tag for the article (e.g., "Breaking News"). */
    label: string;
    /** Publication date of the article (e.g., "2023-10-01"). */
    date: string;
    /** Type of article (e.g., "News"). */
    type: string;
  }[];
}

/**
 * News articles from the CNN Indonesia API.
 * @interface
 */
export interface INewsCnnIND {
  /** Indicates whether the news request was successful. */
  status: boolean;
  /** Array of news articles. */
  data: {
    /** Title of the article. */
    title: string;
    /** URL to the article's thumbnail image. */
    image_thumbnail: string;
    /** URL to the article's full-size image. */
    image_full: string;
    /** Publication time of the article (e.g., "14:30"). */
    time: string;
    /** URL to the article's page. */
    link: string;
    /** Slug for the article (e.g., URL-friendly title). */
    slug: string;
    /** Summary or content of the article. */
    content: string;
  }[];
}

/**
 * News articles from the JKT48 API.
 * @interface
 */
export interface INewsJKT48 {
  /** Indicates whether the news request was successful. */
  status: boolean;
  /** Array of news articles related to JKT48. */
  data: {
    /** Title of the article. */
    title: string;
    /** URL to the article's page. */
    link: string;
    /** Publication date of the article (e.g., "2023-10-01"). */
    date: string;
    /** URL to the article's icon or image. */
    icon: string;
  }[];
}

/**
 * News articles from the Liputan6 API.
 * @interface
 */
export interface INewsLiputan6 {
  /** Indicates whether the news request was successful. */
  status: boolean;
  /** Array of news articles. */
  data: {
    /** Title of the article. */
    title: string;
    /** URL to the article's page. */
    link: string;
    /** URL to the article's thumbnail image. */
    image_thumbnail: string;
    /** Publication time of the article (e.g., "15:00"). */
    time: string;
  };
}

/**
 * Response structure for downloading Instagram media.
 * @interface
 */
export interface IDLInstagram {
  /** Indicates whether the Instagram download request was successful. */
  status: boolean;
  /** Array of Instagram media details. */
  data: {
    /** URL to the media's thumbnail image. */
    thumbnail: string;
    /** URL to download the media (e.g., image, video). */
    url: string;
  }[];
}

/**
 * Response structure for downloading Twitter (X) media.
 * @interface
 */
export interface IDLTwitter {
  /** Indicates whether the Twitter download request was successful. */
  status: boolean;
  /** Details of the Twitter media content. */
  data: {
    /** URL to the media's thumbnail or image. */
    imgUrl: string;
    /** URL to download the media (e.g., video, image). */
    downloadLink: string;
    /** Title of the video or media content. */
    videoTitle: string;
    /** Description or caption of the media content. */
    videoDescription: string;
  };
  /** Error message describing the failure, if applicable. */
  error?: string;
}

/**
 * Response structure for downloading Apple Music tracks.
 * @interface
 */
export interface IDLAppleMusic {
  /** Indicates whether the Apple Music download request was successful. */
  status: boolean;
  /** Details of the Apple Music track. */
  data: {
    /** Title of the track or page. */
    pageTitle: string;
    /** URL to download the MP3 file. */
    mp3DownloadLink: string;
  };
}

/**
 * Response structure for downloading Capcut media.
 * @interface
 */
export interface IDLCapcut {
  /** Indicates whether the Capcut download request was successful. */
  status: boolean;
  /** Details of the Capcut media content. */
  data: {
    /** JSON-LD context URL for the media schema. */
    '@context': string;
    /** Schema type for the media (e.g., "VideoObject"). */
    '@type': string;
    /** Name or title of the media. */
    name: string;
    /** Description of the media content. */
    description: string;
    /** Array of URLs for thumbnail images. */
    thumbnailUrl: string[];
    /** Date the media was uploaded (e.g., "2023-10-01"). */
    uploadDate: string;
    /** URL to download or access the media content. */
    contentUrl: string;
    /** Metadata for the media content. */
    meta: {
      /** Title of the media. */
      title: string;
      /** Short description of the media. */
      desc: string;
      /** Number of likes received. */
      like: number;
      /** Number of plays or views. */
      play: number;
      /** Duration of the media in seconds. */
      duration: number;
      /** Number of times the media has been used (e.g., in templates). */
      usage: number;
      /** Unix timestamp of when the media was created. */
      createTime: number;
      /** URL to the cover image. */
      coverUrl: string;
      /** Aspect ratio of the video (e.g., "16:9"). */
      videoRatio: string;
      /** Details about the media's author. */
      author: {
        /** Name of the author. */
        name: string;
        /** URL to the author's avatar image. */
        avatarUrl: string;
        /** Description or bio of the author. */
        description: string;
        /** URL to the author's profile. */
        profileUrl: string;
        /** Secure user ID of the author. */
        secUid: string;
      };
    };
  };
}

/**
 * Response structure for downloading Douyin media.
 * @interface
 */
export interface IDLDouyin {
  /** Indicates whether the Douyin download request was successful. */
  status: boolean;
  /** Details of the Douyin media content. */
  data: {
    /** Title or caption of the media. */
    title: string;
    /** URL to the media's thumbnail image. */
    thumbnail: string;
    /** Array of download options for different qualities. */
    downloads: {
      /** Quality of the download (e.g., "720p", "1080p"). */
      quality: string;
      /** URL to download the media. */
      url: string;
    }[];
  };
}

/**
 * Response structure for downloading Facebook media.
 * @interface
 */
export interface IDLFacebook {
  /** Indicates whether the Facebook download request was successful. */
  status: boolean;
  /** Array of download options for the Facebook media. */
  data: {
    /** URL to download the media. */
    url: string;
    /** Resolution of the media (e.g., "720p", "1080p"). */
    resolution: string;
    /** Availability of the media format (e.g., "Yes", "No"). */
    format: Formats;
  }[];
}

/**
 * Response structure for downloading Google Drive files.
 * @interface
 */
export interface IDLGDrive {
  /** Indicates whether the Google Drive download request was successful. */
  status: boolean;
  /** Details of the Google Drive file. */
  data: {
    /** Name or title of the file. */
    name: string;
    /** URL to download the file. */
    download: string;
    /** URL to view or access the file on Google Drive. */
    link: string;
  };
}

/**
 * Response structure for downloading MediaFire files.
 * @interface
 */
export interface IDLMediaFire {
  /** Indicates whether the MediaFire download request was successful. */
  status: boolean;
  /** Details of the MediaFire file. */
  data: {
    /** Name of the file. */
    fileName: string;
    /** URL to download the file. */
    downloadLink: string;
    /** Size of the file (e.g., "5 MB"). */
    fileSize: string;
    /** Description of the file. */
    description: string;
    /** Date the file was uploaded (e.g., "2023-10-01"). */
    uploadDate: string;
    /** Type of the file (e.g., "video", "document"). */
    fileType: string;
    /** Compatibility information for the file. */
    compatibility: string;
    /** Metadata for the file's webpage. */
    meta: {
      /** Viewport settings for responsive design. */
      viewport: string;
      /** SEO keywords for the webpage. */
      keywords: string;
      /** Meta description for the webpage. */
      description: string;
      /** Instructions for search engine crawlers. */
      robots: string;
      /** Instructions for Googlebot. */
      googlebot: string;
      /** Instructions for Yahoo Slurp crawler. */
      slurp: string;
      /** Google Translate customization ID. */
      'google-translate-customization': string;
      /** Application ID for the webpage. */
      app_id: string;
      /** Type of content (e.g., "website", "article"). */
      type: string;
      /** Name of the site hosting the file. */
      site_name: string;
      /** Locale of the webpage (e.g., "en_US"). */
      locale: string;
      /** URL of the webpage. */
      url: string;
      /** Title of the webpage. */
      title: string;
      /** URL to the preview image for the file. */
      image: string;
      /** Type of Twitter card for social sharing. */
      card: string;
      /** Twitter handle of the site. */
      site: string;
    };
    /** MIME type of the file (e.g., "application/pdf"). */
    mimeType: string;
    /** File extension (e.g., ".pdf", ".mp4"). */
    fileExtension: string;
  };
}

/**
 * Response structure for downloading Pinterest media.
 * @interface
 */
export interface IDLPinterest {
  /** Indicates whether the Pinterest download request was successful. */
  status: boolean;
  /** Details of the Pinterest media content. */
  data: {
    /** Unique identifier of the Pinterest pin. */
    id: string;
    /** Date and time when the pin was created (e.g., "2023-10-01T12:00:00"). */
    created_at: string;
    /** URL to download or access the media (e.g., image, video). */
    url: string;
  };
}

/**
 * Response structure for downloading SoundCloud audio tracks.
 * @interface
 */
export interface IDLSoundCloud {
  /** Indicates whether the SoundCloud download request was successful. */
  status: boolean;
  /** Title of the audio track. */
  title: string;
  /** URL to download or access the audio track. */
  url: string;
  /** URL to the track's thumbnail image. */
  thumbnail: string;
  /** Duration of the track in seconds. */
  duration: number;
  /** Username or display name of the track's uploader. */
  user: string;
  /** Description of the audio track. */
  description: string;
}

/**
 * Response structure for downloading SnackVideo media.
 * @interface
 */
export interface IDLSnackVideo {
  /** Indicates whether the SnackVideo download request was successful. */
  status: boolean;
  /** Details of the SnackVideo media content. */
  data: {
    /** URL of the SnackVideo post. */
    url: string;
    /** Title or caption of the video. */
    title: string;
    /** Description of the video content. */
    description: string;
    /** URL to the video's thumbnail image. */
    thumbnail: string;
    /** Date the video was uploaded (e.g., "2023-10-01"). */
    uploadDate: string;
    /** URL to download or access the video. */
    videoUrl: string;
    /** Duration of the video (e.g., "2 minutes 36 seconds"). */
    duration: string;
    /** Interaction metrics for the video. */
    interaction: {
      /** Number of views. */
      views: number;
      /** Number of likes. */
      likes: number;
      /** Number of shares. */
      shares: number;
    };
    /** Details about the video's creator. */
    creator: {
      /** Name of the creator. */
      name: string;
      /** URL to the creator's profile. */
      profileUrl: string;
      /** Bio or description of the creator. */
      bio: string;
    };
  };
}

/**
 * Response structure for downloading Spotify music or albums.
 * @interface
 */
export interface IDLSpotify {
  /** Indicates whether the Spotify download request was successful. */
  status: boolean;
  /** Details of the Spotify music or album. */
  data: {
    /** Title of the track or album. */
    title: string;
    /** Type of content (e.g., "album", "track"). */
    type: string;
    /** Artist or band name. */
    artis: string;
    /** Duration of the track or album in milliseconds. */
    durasi: number;
    /** URL to the cover image for the track or album. */
    image: string;
    /** URL to download the MP3 file. */
    download: string;
    /** Status code or identifier for the content (e.g., processing status). */
    status: number;
  };
}

/**
 * Response structure for downloading Sticker.ly sticker packs.
 * @interface
 */
export interface IDLStickerLy {
  /** Indicates whether the Sticker.ly download request was successful. */
  status: boolean;
  /** Details of the Sticker.ly sticker pack. */
  data: {
    /** URL of the sticker pack. */
    pack_url: string;
    /** Total number of stickers in the pack. */
    total_stickers: number;
    /** Array of URLs for individual stickers. */
    stickers: string[];
  };
}

/**
 * Response structure for downloading TikTok media.
 * @interface
 */
export interface IDLTikTok {
  /** Indicates whether the TikTok download request was successful. */
  success: boolean;
  /** Details of the TikTok media content. */
  data: {
    /** Metadata for the TikTok post. */
    metadata: {
      /** Interaction statistics for the post. */
      stats: {
        /** Number of likes received. */
        likeCount: number;
        /** Number of plays or views. */
        playCount: number;
        /** Number of comments. */
        commentCount: number;
        /** Number of shares. */
        shareCount: number;
      };
      /** Title of the post, if available. */
      title: string;
      /** Description of the post, if available. */
      description: string;
      /** Array of hashtags associated with the post. */
      hashtags: string[];
      /** Country code where the post was created (e.g., "ID"). */
      locationCreated: string;
      /** Array of suggested words related to the post. */
      suggestedWords: string[];
    };
    /** Download options for the post. */
    download: {
      /** Array of video download URLs for different qualities. */
      video: string[];
      /** URL to download the audio track. */
      audio: string;
    };
  };
  /** Unique identifier of the TikTok post. */
  postId: string;
}

/**
 * Enum for media format availability.
 * @enum {string}
 */
export enum Formats {
  /** The format is not available. */
  No = 'no',
  /** The format is available. */
  Yes = 'yes',
}

/**
 * Enum for anime types.
 * @enum {string}
 */
export enum Type {
  /** Chinese anime (Donghua). */
  Donghua = 'Donghua',
  /** Anime movie. */
  Movie = 'Movie',
}

/**
 * Enum for anime or manga status.
 * @enum {string}
 */
export enum Status {
  /** Content has finished airing or publishing. */
  Completed = 'Completed',
  /** Content is still airing or publishing. */
  Ongoing = 'Ongoing',
}

/**
 * Enum for APK types.
 * @enum {string}
 */
export enum TypeAn1 {
  /** Modified version of the application. */
  MOD = 'Mod',
  /** Original version of the application. */
  Original = 'Original',
}
