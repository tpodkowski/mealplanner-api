import {
  ValidationPipe,
  ArgumentMetadata,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';

class CustomValidationPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      const formattedMessages = e.response.message.reduce((errors, message) => {
        const [key] = message.split(' ');
        const formattedMessage = message.split(' ').slice(1).join(' ');

        return {
          ...errors,
          [key]: formattedMessage,
        };
      }, {});

      if (e instanceof BadRequestException) {
        throw new UnprocessableEntityException(formattedMessages);
      }
    }
  }
}

export { CustomValidationPipe };
