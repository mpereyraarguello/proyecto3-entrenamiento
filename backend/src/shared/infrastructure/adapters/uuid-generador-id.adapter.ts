import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { GeneradorId } from '../../application/ports/generador-id.port';

@Injectable()
export class UuidGeneradorIdAdapter implements GeneradorId {
  generar(): string {
    return randomUUID();
  }
}
