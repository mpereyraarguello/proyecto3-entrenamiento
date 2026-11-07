import { Injectable } from '@nestjs/common';
import { RelojPort } from '../../application/ports/reloj.port';

@Injectable()
export class RelojSystemAdapter implements RelojPort {
  /**
   * Devuelve la fecha y hora actual del sistema operativo.
   */
  ahora(): Date {
    return new Date();
  }
}