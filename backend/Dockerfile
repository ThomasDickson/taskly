FROM python:3.9

WORKDIR /backend/app
COPY . /app

# install requirements
COPY /backend/requirements.txt app/requirements.txt
RUN pip install --no-cache-dir -r /backend/app/requirements.txt

# run tests
RUN pytest /backend/app/pytest

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]