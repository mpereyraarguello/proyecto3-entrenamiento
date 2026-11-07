import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DomainException } from '../../domain/domain.exception';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.BAD_REQUEST;
    if (exception.name.includes('YaExiste') || exception.name.includes('Duplicad')) {
      status = HttpStatus.CONFLICT;
    } else if (exception.name.includes('NoEncontrado')) {
      status = HttpStatus.NOT_FOUND;
    }

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}

