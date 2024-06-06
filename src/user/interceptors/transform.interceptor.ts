import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs";


@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        console.log(context);

        return next.handle().pipe(
            map((data) => {
                // console.log("Data", data);
                const response = {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    role: data.role
                };
                return { data: response };
            })
        );
    }
}
