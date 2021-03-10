declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_PORT?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_SECRET?: string;
    SESSION_SECRET?: string;
    MYSQL_DB_HOST?: string;
    MYSQL_DB_USERNAME?: string;
    MYSQL_DB_DB_PORT?: string;
    MYSQL_DB_NAME?: string;
    MYSQL_DB_PASSWORD?: string;
    ENVIRONMENT?: Environment;
  }
  export type Environment = 'production' | 'test' | 'development';
}
