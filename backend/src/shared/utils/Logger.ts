export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

export class Logger {
  constructor(private readonly scope: string) {}

  private format(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${this.scope}] [${level.toUpperCase()}] ${message}`;
  }

  log(level: LogLevel, message: string): void {
    // eslint-disable-next-line no-console
    console.log(this.format(level, message));
  }

  info(message: string): void {
    this.log('info', message);
  }

  warn(message: string): void {
    this.log('warn', message);
  }

  error(message: string): void {
    this.log('error', message);
  }

  debug(message: string): void {
    this.log('debug', message);
  }
}

export const createLogger = (scope: string): Logger => new Logger(scope);
