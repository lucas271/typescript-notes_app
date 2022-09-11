import { Note } from './note'

export interface User {
  username: string;
  notes: Note[];
}
