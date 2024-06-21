from gensim.models import KeyedVectors
import gensim.downloader as api
import csv

answers = ["Brown", "Thirteen", "Picture", "Stadium", "September", "Stiletto", "Cleveland", "Piano", "Italian", "Billy"]

# Load the pre-trained Word2Vec model (e.g., Google's pre-trained model)
# model_path = 'word2vec-google-news-300.model'  # Update with the actual path
model = api.load("glove-twitter-25")

for answer in answers:

    answer = answer.lower()

    # Get the 10,000 words most similar to "September"
    similar_words = model.most_similar(answer, topn=10000)

    # Write the words to a CSV file
    output_file = f'similar_{answer}.csv'
    with open(output_file, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Word', 'Similarity'])
        writer.writerow([answer, 1.0])
        for word, similarity in similar_words:
            writer.writerow([word, similarity])

    print(f"Successfully written the most similar words to {answer} to {output_file}")